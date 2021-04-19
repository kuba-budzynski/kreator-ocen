export const round = (price, to = 100, down = 30) => {
    if(Math.floor(price % to) < down){
        return Math.floor(price / to) * to
    }
    else return Math.ceil((price / to)) * to
}