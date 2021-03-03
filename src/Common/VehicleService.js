
// Init form values
export const initVechileValue = {
  modelAuto: '',
  email: '',
  mobile: '',
  city: '',
  motor: 'benzin',
  producer: '',
  sellDate: new Date(),
  isLoan: true,
};


// list of vehicle producers
export const getProducerOptions = () => [
  { id: 'p1', producer: 'BMW' },
  { id: 'p2', producer: 'FORD' },
  { id: 'p3', producer: 'AUDI' },
  { id: 'p4', producer: 'FIAT' },
  { id: 'p5', producer: 'VOLVO' },
  { id: 'p6', producer: 'TOYOTA' },
]

// list of vehicle models
export const getModelOptions = () => [
  { id: 'm1', model: 'BMW mod1' , producerId:'p1'},
  { id: 'm2', model: 'FORD mod1', producerId:'p2' },
  { id: 'm3', model: 'AUDI mod1', producerId:'p3' },
  { id: 'm4', model: 'FIAT mod1', producerId:'p4'},
  { id: 'm5', model: 'VOLVO mod1' ,producerId:'p5' },
  { id: 'm6', model: 'TOYOTA mod1', producerId:'p6'},
  { id: 'm7', model: 'BMW mod2' , producerId:'p1'},
  { id: 'm8', model: 'FORD mod2', producerId:'p2' },
  { id: 'm9', model: 'AUDI mod2', producerId:'p3' },
  { id: 'm10', model: 'FIAT mod2', producerId:'p4'},
  { id: 'm11', model: 'VOLVO mod2' ,producerId:'p5' },
  { id: 'm12', model: 'TOYOTA mod2', producerId:'p6'},
]



// init fake value u listVehicle
export const listVehicleInit = [
  {
    id: 'idx001',
    modelAuto: 'm7',
    email: 'email11@yahoo',
    mobile: 11111111,
    city: 'Sesvete',
    motor: 'diesel',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
  {
    id:'idx002',
    modelAuto: 'm8',
    email: 'email22@yahoo.com',
    mobile: 222222222,
    city: 'Zagreb',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx003',
    modelAuto: 'm3',
    email: 'email33@yahoo.com',
    mobile: 333333,
    city: 'Osjek',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx004',
    modelAuto: 'm4',
    email: 'email44@yahoo.com',
    mobile: 4444,
    city: 'Split',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id:'idx005',
    modelAuto: 'm4',
    email: 'email55@yahoo.com',
    mobile: 5555,
    city: 'Rijeka',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx006',
    modelAuto: 'm4',
    email: 'email66@yahoo.com',
    mobile: 666,
    city: 'Pula',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
  {
    id: 'idx007',
    modelAuto: 'm6',
    email: 'email77@yahoo.com',
    mobile: 777777,
    city: 'Pula',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
];


