


export function getCardsForPlayer(oldPack) {
  let pack = oldPack.slice()
  let cards = []
  for (let u = 0; u < 10; u++)
    cards.push(pack.pop())
  cards = cards.sort(function (a, b) { return a.replace(/\*/g, '') - b.replace(/\*/g, '') })
  return {cards:cards, pack:pack}
}


export function getShuffledPack() {
  let pack = []
  for (let r = 0; r < 104; r++) {
    pack.push(r + 1)
    if (pack[r] == 55)
      pack[r] = pack[r] + "*******"
    else {
      pack[r] = pack[r] + "*"
      if ((r + 1) % 11 == 0)
        pack[r] = pack[r] + "****"
      if ((r + 1) % 10 == 0)
        pack[r] = pack[r] + "**"
      if ((r + 1) % 5 == 0 && (r + 1) % 10 != 0)
        pack[r] = pack[r] + "*"
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

