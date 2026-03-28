import libros from '../data/libros';

// Normalizes a text: lowercase, remove accents
function normalize(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

class SearchEngine {
    constructor() {
        this.paragraphs = [];
        this.isIndexed = false;
        this.indexPromise = null;
    }

    async init() {
        if (this.isIndexed || this.indexPromise) return this.indexPromise;

        this.indexPromise = this.buildIndex();
        await this.indexPromise;
    }

    async buildIndex() {
        console.log('Building search index...');

        for (const [bookIdx, book] of Object.entries(libros)) {
            const bookKey = book.volumen;
            const volumeId = (parseInt(bookIdx) + 1).toString();
            const chapters = book.capitulos;

            // Track paragraph index within each volume
            let paragraphIndexInVolume = 0;

            for (const chapter of chapters) {
                // Add chapter title as a searchable paragraph
                const titlePara = chapter.titulo;
                this.paragraphs.push({
                    id: this.paragraphs.length,
                    bookTitle: bookKey,
                    volumeId,
                    chapterTitle: chapter.titulo,
                    content: titlePara,
                    normalizedContent: normalize(titlePara),
                    preview: titlePara.substring(0, 150) + (titlePara.length > 150 ? '...' : ''),
                    paragraphIndex: paragraphIndexInVolume,
                    isTitle: true
                });
                paragraphIndexInVolume++;

                // Load chapter content from file
                try {
                    const response = await fetch(chapter.path);
                    if (response.ok) {
                        const text = await response.text();
                        // Split by paragraphs (double newlines)
                        const paragraphs = text.split(/\n\n+/).filter(p => p.trim() !== '');

                        for (let i = 0; i < paragraphs.length; i++) {
                            const para = paragraphs[i].replace(/\n/g, ' ').trim();
                            if (para.length > 0) {
                                this.paragraphs.push({
                                    id: this.paragraphs.length,
                                    bookTitle: bookKey,
                                    volumeId,
                                    chapterTitle: chapter.titulo,
                                    content: para,
                                    normalizedContent: normalize(para),
                                    preview: para.substring(0, 150) + (para.length > 150 ? '...' : ''),
                                    paragraphIndex: paragraphIndexInVolume,
                                    isTitle: false
                                });
                                paragraphIndexInVolume++;
                            }
                        }
                    }
                } catch (error) {
                    console.warn(`Could not load chapter ${chapter.path}:`, error);
                }
            }
        }

        this.isIndexed = true;
        this.indexPromise = null;
        console.log(`Search index built: ${this.paragraphs.length} paragraphs indexed.`);
    }

    async search(query) {
        if (!this.isIndexed) {
            await this.init();
        }

        if (!query || query.trim() === '') return [];

        const terms = normalize(query).split(/\s+/).filter(t => t.length > 2);
        if (terms.length === 0) return [];

        const results = this.paragraphs.filter(para => {
            // All terms must appear in the paragraph
            return terms.every(term => para.normalizedContent.includes(term));
        });

        // Sort by: 1) content paragraphs first, 2) number of matching terms
        results.sort((a, b) => {
            // Prefer content over titles
            if (a.isTitle && !b.isTitle) return 1;
            if (!a.isTitle && b.isTitle) return -1;

            // Then sort by relevance (number of term matches)
            const aScore = terms.reduce((acc, term) => acc + (a.normalizedContent.split(term).length - 1), 0);
            const bScore = terms.reduce((acc, term) => acc + (b.normalizedContent.split(term).length - 1), 0);
            return bScore - aScore;
        });

        return results.slice(0, 20);
    }
}

// Export a singleton instance
export const librarySearch = new SearchEngine();
