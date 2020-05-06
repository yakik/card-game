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
    RESHUFFLE_USED_CARDS:"reshuffle_used_cards",
    TAKI_SPECIAL_CARD:"taki_Special_card"
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

export const envTypes = {
    PRODUCTION : 'production'
}
    
export const takiCardTypes = {
    STOP : 'stop',
    CHANGE_DIRECTION :'change_order',
    PLUS : 'plus',
    PLUS_TWO: 'plus_two',
    NUMBER: 'number',
    CHANGE_COLOR: 'change_color',
    TAKI:'taki',
    KING: 'king',
    PLUS_THREE: 'plus_three',
    PLUS_THREE_BREAK: 'plus_three_break'
}

export const takiColors = {
    GREEN : 'green',
    YELLOW :'yellow',
    RED : 'red',
    BLUE: 'blue',
    NOT_APPLICABLE: 'not_applicable'
}

export const takiSpecialAction = {
    SELECT_COLOR : 'select_color'
}

export const userActions = {
    TAKE_CARD : 'take_card',
    SELECT_CARD : 'select_card'
}



export const errors = {
    KING_MISSING_SELECTED_TYPE : '10_king_missing_selected_type',
    KING_MISSING_COLOR_SELECTION : '11_king_missing_color_selection',
    CHANGE_COLOR_MISSING_COLOR_SELECTION : '20_change_color_missing_color_selection',
}