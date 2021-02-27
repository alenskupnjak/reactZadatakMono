import { makeObservable, observable, computed } from 'mobx';


const dataVehicle = [
  {
    id: 0,
    model: 'X5',
    email: 'email',
    mobile: 12345679998,
    city: 'Sesvete',
    motor: 'diesel',
    make: "BMV",
    makeId: '1',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
];




class Store {
  constructor() {
    makeObservable(this, {
      vehicle: observable,
      color: observable,
      errors: observable,
      // pokemon: observable,
      filter: observable,
      selectedPokemon: observable,
      filteredPokemon: computed,
      zaposleniciData: computed,
    });
  }

  // const [values, setValues] = useState(initialFValues);
  // const [errors, setErrors] = useState({});

  //  boja u Headeru
  color = 'default';
  errors = {}; // greška u template
  vehicle = dataVehicle;

  pokemon = [];
  filter = '';
  selectedPokemon = null;

  get filteredPokemon() {
    return this.pokemon
      .filter(({ name: { english } }) =>
        english.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
      )
      .slice(0, 20);
  }

  setZaposlenici(data) {
    this.zaposlenici.push(data);
    console.log('zaposlenici', this.zaposlenici);
  }

  // povlacenje svih zaposlenika
  get zaposleniciData() {
    return this.zaposlenici
  }

  setColor(color) {
    console.log('color=', color);

    this.color = color;
  }

  // Setiranje grešaka
  setErrors(data) {
    console.log(data);
    this.errors = { ...data };
  }

  // setPokemon(pokemon) {
  //   this.pokemon = pokemon;
  // }
  setFilter(filter) {
    this.filter = filter;
  }
  setSelectedPokemon(selectedPokemon) {
    this.selectedPokemon = selectedPokemon;
  }
}

const store = new Store();

// fetch('/starting-react/pokemon.json')
//   .then((resp) => resp.json())
//   .then((pokemon) => store.setPokemon(pokemon));



export default store;
