"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSongGraph = buildSongGraph;
exports.buildCardSongIndex = buildCardSongIndex;
exports.deriveSongsInFromSongIndex = deriveSongsInFromSongIndex;
function buildSongGraph(cards) {
    const byId = {};
    const songsOutById = {};
    const songsInById = {};
    for (const card of cards) {
        byId[card.id] = {
            id: card.id,
            title: card.title,
            artist: card.artist,
            genre: card.genre,
            artwork: card.artwork,
            artworkUrl: card.artworkUrl,
            printedSetId: card.printedSetId,
        };
        songsOutById[card.id] = [];
        songsInById[card.id] = [];
    }
    for (const card of cards) {
        const seen = new Set();
        for (const outId of card.songsOut ?? []) {
            if (seen.has(outId)) {
                throw new Error(`Duplicate songsOut id "${outId}" in card "${card.title}" (${card.id})`);
            }
            seen.add(outId);
            if (!(outId in byId)) {
                throw new Error(`Unknown songsOut id "${outId}" referenced by "${card.title}" (${card.id})`);
            }
            songsOutById[card.id].push(outId);
            songsInById[outId].push(card.id);
        }
    }
    return { byId, songsOutById, songsInById };
}
function buildCardSongIndex(cards, prebuilt) {
    const g = prebuilt ?? buildSongGraph(cards);
    const index = {};
    for (const key of Object.keys(g.byId)) {
        const id = Number(key);
        const base = g.byId[id];
        index[id] = {
            ...base,
            songsOut: g.songsOutById[id] ?? [],
        };
    }
    return index;
}
function deriveSongsInFromSongIndex(cardSongIndex, targetId) {
    const incoming = [];
    for (const key of Object.keys(cardSongIndex)) {
        const sourceId = Number(key);
        if (cardSongIndex[sourceId]?.songsOut.includes(targetId)) {
            incoming.push(sourceId);
        }
    }
    return incoming;
}
//# sourceMappingURL=song-graph.js.map