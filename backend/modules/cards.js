


export function getCardsForPlayer(oldPack) {
  let pack = oldPack.slice()
  let cards = []
  for (let u = 0; u < 10; u++)
    cards.push(pack.pop())
  cards = cards.sort(function (a, b) { return a.number - b.number })
  return {cards:cards, pack:pack}
}


export function getShuffledPack() {
  let pack = []
  for (let r = 0; r < 104; r++) {
    pack.push({number:(r + 1), sign:'', show:'--'})
    if (pack[r] == 55)
      pack[r].sign +=  "*******"
    else {
      pack[r].sign+=  "*"
      if ((r + 1) % 11 == 0)
        pack[r].sign +=  "****"
      if ((r + 1) % 10 == 0)
        pack[r].sign+= "**"
      if ((r + 1) % 5 == 0 && (r + 1) % 10 != 0)
        pack[r].sign+= "*"
    }

  }
  for (let f = 0; f < 300; f++) {
    let a = Math.round(Math.random() * 103)
    let b = Math.round(Math.random() * 103)
    let p = pack[a]
    pack[a] = pack[b]
    pack[b] = p
    f = f + 1
  }
  return pack
}

