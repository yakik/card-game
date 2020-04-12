export function getShuffledPack() {
  let hafisa = []
  for (let r = 0; r < 104; r++) {
    hafisa.push(r + 1)
    if (hafisa[r] == 55)
      hafisa[r] = hafisa[r] + "*******"
    else {
      hafisa[r] = hafisa[r] + "*"
      if ((r + 1) % 11 == 0)
        hafisa[r] = hafisa[r] + "****"
      if ((r + 1) % 10 == 0)
        hafisa[r] = hafisa[r] + "**"
      if ((r + 1) % 5 == 0 && (r + 1) % 10 != 0)
        hafisa[r] = hafisa[r] + "*"
    }

  }
  for (let f = 0; f < 300; f++) {
    let a = Math.round(Math.random() * 103)
    let b = Math.round(Math.random() * 103)
    let p = hafisa[a]
    hafisa[a] = hafisa[b]
    hafisa[b] = p
    f = f + 1
  }
  return hafisa
}

