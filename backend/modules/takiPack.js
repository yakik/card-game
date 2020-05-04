import { takiCardTypes, takiColors } from '../constants';
import { getShuffledPack } from './cards';
import { resetCard, assignCardsForPlayers } from './taki';
export function reshuffleUsedCards(game) {
    let cardsOnTable = game.onTable.length - 1;
    for (let i = 0; i < cardsOnTable; i++)
        game.pack.push(resetCard(game.onTable.shift()));
    if (game.pack.length > 1) {
        for (let f = 0; f < 300; f++) {
            let cardIndexA = Math.round(Math.random() * (game.pack.length - 1));
            let cardIndexB = Math.round(Math.random() * (game.pack.length - 1));
            let p = game.pack[cardIndexA];
            game.pack[cardIndexA] = game.pack[cardIndexB];
            game.pack[cardIndexB] = p;
            f = f + 1;
        }
    }
}
export function setOnTable(game, card) {
    game.onTable = [];
    game.onTable.push(card);
}
export function setGamePack(game, pack) {
    game.pack = pack;
}
export function reshuffle(game) {
    game.onTable = [];
    setGamePack(game, getShuffledPack(getTakiPack()));
    assignCardsForPlayers(game);
    setOnTable(game, pullCardFromPack(game, { type: takiCardTypes.NUMBER }));
}
export function pullCardFromPack(game, criterion) {
    if (criterion === undefined)
        return game.pack.pop();
    else {
        let cardIndex;
        if (criterion.type === takiCardTypes.NUMBER) {
            if (criterion.color === undefined && criterion.number === undefined)
                cardIndex = game.pack.findIndex((card) => (card.type === takiCardTypes.NUMBER));
            else
                cardIndex = game.pack.findIndex((card) => (card.type === criterion.type && card.color === criterion.color && card.number === criterion.number));
        }
        else
            cardIndex = game.pack.findIndex((card) => (card.color === criterion.color && card.type === criterion.type));
        let card = game.pack.splice(cardIndex, 1)[0];
        return card;
    }
}

export function getTakiPack() {
    let pack = [];
    let id = 0;
    let colorCounter = 0;
    let colors = [takiColors.GREEN, takiColors.YELLOW, takiColors.BLUE, takiColors.RED];
    colors.map(color => {
        colorCounter++;
        for (let j = 0; j < 2; j++) {
            for (let i = 1; i < 10; i++) {
                if (i !== 2)
                    pack.push({ ID: id++, forSorting: colorCounter * 100 + i, color: color, number: i, type: takiCardTypes.NUMBER });
                else
                    pack.push({ ID: id++, forSorting: colorCounter * 100 + i, color: color, type: takiCardTypes.PLUS_TWO });
            }
            pack.push({ ID: id++, forSorting: colorCounter * 100 + 30, color: color, type: takiCardTypes.STOP });
            pack.push({ ID: id++, forSorting: colorCounter * 100 + 31, color: color, type: takiCardTypes.CHANGE_DIRECTION });
            pack.push({ ID: id++, forSorting: colorCounter * 100 + 32, color: color, type: takiCardTypes.PLUS });
            pack.push({ ID: id++, forSorting: colorCounter * 100 + 33, color: color, type: takiCardTypes.TAKI });
        }
    });
    for (let i = 0; i < 6; i++)
        pack.push({ ID: id++, forSorting: 1001, color: takiColors.NOT_APPLICABLE, type: takiCardTypes.CHANGE_COLOR });
    pack.push({ ID: id++, forSorting: 1005, color: takiColors.NOT_APPLICABLE, type: takiCardTypes.KING });
    pack.push({ ID: id++, forSorting: 1006, color: takiColors.NOT_APPLICABLE, type: takiCardTypes.KING });
    for (let i = 0; i < 2; i++)
        pack.push({ ID: id++, forSorting: 1007, color: takiColors.NOT_APPLICABLE, type: takiCardTypes.PLUS_THREE_BREAK });
    for (let i = 0; i < 2; i++)
        pack.push({ ID: id++, forSorting: 1012, color: takiColors.NOT_APPLICABLE, type: takiCardTypes.PLUS_THREE });
    return pack;
}

