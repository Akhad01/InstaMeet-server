// 1) У любого пользователя будет как минимум в БД qualities & professions
// 2) Они равны mock данным

const Proffesion = require('../models/Proffesion')
const Quality = require('../models/Quality')
const professionMock = require('../mock/professions.json')
const qualitiesMock = require('../mock/qualities.json')

module.exports = async () => {
  const profession = await Proffesion.find()

  if (profession.length !== professionMock.length) {
    await createInitialEntity(Proffesion, professionMock)
  }

  const quality = await Quality.find()

  if (quality.length !== qualitiesMock.length) {
    await createInitialEntity(Quality, qualitiesMock)
  }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()

  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (error) {
        return error
      }
    })
  )
}
