const getAccountData = (searchId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: searchId,
        },
      ])
    }, 1000)
  })
}

export default getAccountData
