"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROOT_GENRE_PRINTED_TYPE_CODE = exports.PRINTED_DEFAULT_SEASON = void 0;
exports.territoryToPrintedTypeCode = territoryToPrintedTypeCode;
exports.printedTypeCodeForSongCard = printedTypeCodeForSongCard;
exports.printedTypeCodeForTransitionGenre = printedTypeCodeForTransitionGenre;
exports.printedSetIdTypeSegment = printedSetIdTypeSegment;
exports.formatPrintedSetId = formatPrintedSetId;
const genre_names_1 = require("./genre-names");
const genre_subgenres_1 = require("./genre-subgenres");
const iso_alpha2_by_territory_name_1 = require("./iso-alpha2-by-territory-name");
exports.PRINTED_DEFAULT_SEASON = "S1";
const SUBGENRE_BY_NAME = new Map(genre_subgenres_1.SUBGENRES.map((s) => [s.n, s]));
exports.ROOT_GENRE_PRINTED_TYPE_CODE = {
    Rock: "RK",
    Mainstream: "PP",
    Electronic: "EL",
    "Reggae/Dub": "WD",
    "Hip-Hop": "HH",
    "Disco/Funk": "DF",
    Classical: "CL",
    Vintage: "VT",
};
const TERRITORY_ISO_OVERRIDES = {};
const TERRITORY_TO_ISO_ALPHA2 = {
    ...iso_alpha2_by_territory_name_1.ISO_ALPHA2_BY_TERRITORY_NAME,
    ...TERRITORY_ISO_OVERRIDES,
};
function territoryToPrintedTypeCode(territoryName) {
    const code = TERRITORY_TO_ISO_ALPHA2[territoryName];
    if (!code) {
        throw new Error(`Printed set id: unknown territory "${territoryName}" (fix taxonomy label or ISO map)`);
    }
    return code;
}
function lookupPrintedCode(anchorGenreName, codeByAnchorName) {
    const code = codeByAnchorName.get(anchorGenreName);
    if (!code) {
        throw new Error(`Printed set id: missing printedTypeCode in DB for taxonomy genre "${anchorGenreName}"`);
    }
    return code;
}
function isGenreName(s) {
    return genre_names_1.GENRE_NAMES.includes(s);
}
function printedTypeAnchorForSongStripe(genreStripeLabel) {
    const genre = genreStripeLabel?.trim();
    if (!genre)
        throw new Error("Printed set id: missing genre stripe");
    const def = SUBGENRE_BY_NAME.get(genre);
    if (def?.kind === "country")
        return def.parentA;
    if (def?.kind === "genre")
        return def.parentA;
    if (isGenreName(genre))
        return genre;
    throw new Error(`Printed set id: cannot resolve TYPE anchor for genre "${genre}"`);
}
function printedTypeCodeForSongCard(input, codeByAnchorName) {
    const genre = input.genre?.trim();
    if (!genre) {
        throw new Error(`Printed set id: missing genre (${input.title ?? "?"}${input.id != null ? ` id ${input.id}` : ""})`);
    }
    const def = SUBGENRE_BY_NAME.get(genre);
    if (def?.kind === "country") {
        const canonical = def.parentA;
        const c = input.country?.trim();
        if (c && c !== canonical) {
            throw new Error(`Printed set id: country stripe "${genre}" expects territory "${canonical}", got "${input.country}" (${input.title ?? "?"} ${input.id ?? ""})`);
        }
    }
    const anchor = printedTypeAnchorForSongStripe(genre);
    return lookupPrintedCode(anchor, codeByAnchorName);
}
function printedTypeCodeForTransitionGenre(rootGenreLabel, codeByAnchorName) {
    if (!rootGenreLabel?.trim())
        throw new Error("Printed set id: transition genre required");
    if (!isGenreName(rootGenreLabel)) {
        throw new Error(`Printed set id: unknown transition pillar genre "${rootGenreLabel}"`);
    }
    return lookupPrintedCode(rootGenreLabel, codeByAnchorName);
}
function printedSetIdTypeSegment(printedSetId) {
    const trimmed = printedSetId.trim();
    const dash = trimmed.indexOf("-");
    if (dash < 2) {
        throw new Error(`printedSetId must start with a TYPE segment of exactly two letters followed by a hyphen`);
    }
    const seg = trimmed.slice(0, dash).toUpperCase();
    if (!/^[A-Z]{2}$/.test(seg)) {
        throw new Error(`printedSetId TYPE segment must be two ASCII letters, got "${trimmed.slice(0, dash)}"`);
    }
    return seg;
}
function formatPrintedSetId(typeCode, seasonCode, sequenceWithinSeason, variantSuffix) {
    if (sequenceWithinSeason < 1 || sequenceWithinSeason > 180) {
        throw new Error(`Printed sequence must be 1–180 inclusive, got ${sequenceWithinSeason}`);
    }
    const padded = String(sequenceWithinSeason).padStart(3, "0");
    return `${typeCode}-${seasonCode}-${padded}${variantSuffix ?? ""}`;
}
//# sourceMappingURL=printed-set-id.js.map