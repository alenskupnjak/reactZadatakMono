// Init values and reset for form
export const initVechileValue = {
  modelAuto: '',
  model: '',
  email: '',
  mobile: '',
  city: '',
  motor: 'benzin',
  producer: '',
  sellDate: new Date(),
  isLoan: true,
};

//
// Init valuues for form producers
export const initProducerValue = [
  { id: '', model: '', producerId: '', producer: '' },
];


//
// list of vehicle producers
export const listProducers = [
  { id: 'p1', producer: 'BMW' },
  { id: 'p2', producer: 'FORD' },
  { id: 'p3', producer: 'AUDI' },
  { id: 'p4', producer: 'FIAT' },
  { id: 'p5', producer: 'VOLVO' },
  { id: 'p6', producer: 'TOYOTA' },
];

//
// list of vehicle models
export const listModelVechile = [
  { id: 'm1', model: 'BMW mod1', producerId: 'p1', producer: 'BMW' },
  { id: 'm2', model: 'FORD mod1', producerId: 'p2', producer: 'FORD' },
  { id: 'm3', model: 'AUDI mod1', producerId: 'p3', producer: 'AUDI' },
  { id: 'm4', model: 'FIAT mod1', producerId: 'p4', producer: 'FIAT' },
  { id: 'm5', model: 'VOLVO mod1', producerId: 'p5', producer: 'VOLVO' },
  { id: 'm6', model: 'TOYOTA mod1', producerId: 'p6', producer: 'TOYOTA' },
  { id: 'm7', model: 'BMW 2mod', producerId: 'p1', producer: 'BMW' },
  { id: 'm8', model: 'FORD 2mod', producerId: 'p2', producer: 'FORD' },
  { id: 'm9', model: 'AUDI 2mod', producerId: 'p3', producer: 'AUDI' },
  { id: 'm10', model: 'FIAT 2mod', producerId: 'p4', producer: 'FIAT' },
  { id: 'm11', model: 'VOLVO 2mod', producerId: 'p5', producer: 'VOLVO' },
  { id: 'm12', model: 'TOYOTA 2mod', producerId: 'p6', producer: 'TOYOTA' },
];


//
// value for TABLE header
export const headCellVechile = [
  { id: 'model', label: 'Model' },
  { id: 'email', label: 'Email', disabledSorting: true },
  { id: 'mobile', label: 'Mobile' },
  { id: 'city', label: 'City' },
  { id: 'motor', label: 'Motor' },
  { id: 'producer', label: 'Producer' },
  { id: 'action', label: 'Action', disabledSorting: true },
];

//
// value for TABLE header
export const headCellProducer = [
  { id: 'model', label: 'Model' },
  { id: 'producer', label: 'Producer' },
  { id: 'action', label: 'Action', disabledSorting: true },
];

//
// init fake value u listVehicle
export const listVehicleInit = [
  {
    id: 'idx001',
    modelAuto: 'm7',
    email: 'email11@yahoo',
    mobile: '11',
    city: 'Sesvete',
    motor: 'diesel',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
  {
    id: 'idx002',
    modelAuto: 'm8',
    email: 'email22@yahoo.com',
    mobile: '222',
    city: 'Vukovar',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx003',
    modelAuto: 'm8',
    email: 'email22@yahoo.com',
    mobile: '3333',
    city: 'Split',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx004',
    modelAuto: 'm10',
    email: 'email22@yahoo.com',
    mobile: '44444',
    city: 'Zagreb',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx005',
    modelAuto: 'm1',
    email: 'email22@yahoo.com',
    mobile: '55555522',
    city: 'Vinkovci',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx006',
    modelAuto: 'm1',
    email: 'email22@yahoo.com',
    mobile: '6666666',
    city: 'Buzet',
    motor: 'diesel',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx007',
    modelAuto: 'm9',
    email: 'email22@yahoo.com',
    mobile: '7777777',
    city: 'Prag',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx008',
    modelAuto: 'm12',
    email: 'email22@yahoo.com',
    mobile: '8888888',
    city: 'Osijek',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx009',
    modelAuto: 'm8',
    email: 'email22@yahoo.com',
    mobile: '9999999',
    city: 'Kutina',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
  {
    id: 'idx010',
    modelAuto: 'm8',
    email: 'email22@yahoo.com',
    mobile: '100000',
    city: 'Pula',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
  {
    id: 'idx011',
    modelAuto: 'm5',
    email: 'email22@yahoo.com',
    mobile: '101000',
    city: 'Pula',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
];
