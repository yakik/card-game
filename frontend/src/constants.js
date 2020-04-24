export const routes = {
    START_NEW_GAME: '/startNewGame',
    JOIN_GAME: '/joinGame'
}

export const socketMsgTypes ={
    SET_GAME_STATE:'game_state',
    CONNECTION:'connection',
    REFRESH:'refresh',
    START_GAME:'start_game',
    UPDATE_PILES_AND_SCORES:'update_piles_And_scores',
    REMOVE_PLAYER:'remove_player',
    REVEAL_CARDS:'reveal_cards',
    RESHUFFLE:'reshuffle',
    SELECT_CARDS:"select_card",
    TAKE_CARD:"take_card",
    TAKE_CARD_BACK:"take_card_back",
    RESHUFFLE_USED_CARDS:"reshuffle_used_cards"
}

export const states = {
    SELECTING_CARDS:'select_cards',
    ALL_PLAYERS_SELECTED_CARDS: 'all_selected',
    RELATING_CARDS_TO_PILES: 'cards_to_piles',
    NOT_IN_GAME : 'not_in_game',
    IN_GAME_NOT_MANAGER : 'in_game_not_manager',
    IN_GAME_AS_MANAGER : 'in_game_as_manager'
}

export const gameTypes = {
    TAKE_SIX : "Take Six",
    TAKI : "Taki"
}

export const endPoints = {
    LOCAL_HOST: "http://localhost:5000",
    PRODUCTION : "https://card-game989.herokuapp.com"
    }

export const envTyoes = {
    PRODUCTION : 'production'
}
    