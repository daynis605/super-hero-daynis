import { FormGroup } from '@angular/forms';
import { SuperherosI } from '../root-app/interfaces/superheros';

export function isExistSuperHero(
  superheros: SuperherosI,
  listSuperHeros: SuperherosI[]
): boolean {
  const hero = listSuperHeros.find(
    (hero) =>
      hero.name.toLocaleUpperCase() === superheros.name.toLocaleUpperCase()
  );

  return hero !== undefined;
}

export function superHeroFactory(form: FormGroup): SuperherosI {
  const { name, description, photo, powers, battle_numbers } = form.value;

  return {
    name: name,
    description: description,
    photo: photo,
    battle_numbers: powers,
    powers: battle_numbers,
  };
}
