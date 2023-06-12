/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const defaultGorevler = [{ Adi: "Sağlıklı beslen", Aciklama: "Sağlıklı ol" }];

const defaultTasklar = [
  { Adi: "Spor yap", Aciklama: "Spora git", GorevId: 1 },
  { Adi: "Beslenmene dikkat et", Aciklama: "Meyve ye", GorevId: 1 },
];

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("Tasklar").truncate();
  await knex("Gorevler").truncate();

  await knex("Gorevler").insert(defaultGorevler);
  await knex("Tasklar").insert(defaultTasklar);
};
