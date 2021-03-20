// Init values and reset for vehicle form
export const getInitVehicleValue = () => {
  return {
    modelAuto: '',
    model: '',
    email: '',
    mobile: '',
    city: '',
    motor: 'benzin',
    producer: '',
    sellDate: new Date(),
    isLoan: false,
  };
};

//
// Init valuues for form producers
export const getInitProducerValue = () => [
  { id: '', model: '', producerId: '' },
];

//
// list of vehicle producers
const listProducers = () => [
  { id: 'p1', producer: 'BMW' },
  { id: 'p2', producer: 'FORD' },
  { id: 'p3', producer: 'AUDI' },
  { id: 'p4', producer: 'FIAT' },
  { id: 'p5', producer: 'VOLVO' },
  { id: 'p6', producer: 'TOYOTA' },
  { id: 'p7', producer: 'KIA' },
  { id: 'p8', producer: 'MAZDA' },
];
export const getListProducersData = () => {
  return listProducers();
};

//
// list of vehicle models
const listModelVechile = () => [
  { id: 'm01', model: 'BMW 1', producerId: 'p1' },
  { id: 'm02', model: 'FORD 1', producerId: 'p2' },
  { id: 'm03', model: 'AUDI 1', producerId: 'p3' },
  { id: 'm04', model: 'FIAT 1', producerId: 'p4' },
  { id: 'm05', model: 'VOLVO 1', producerId: 'p5' },
  { id: 'm06', model: 'TOYOTA 1', producerId: 'p6' },
  { id: 'm07', model: 'BMW 2', producerId: 'p1' },
  { id: 'm08', model: 'FORD 2', producerId: 'p2' },
  { id: 'm09', model: 'AUDI 2', producerId: 'p3' },
  { id: 'm10', model: 'FIAT 2', producerId: 'p4' },
  { id: 'm11', model: 'VOLVO 2', producerId: 'p5' },
  { id: 'm12', model: 'TOYOTA 2', producerId: 'p6' },
  { id: 'm13', model: 'TOYOTA 3', producerId: 'p6' },
];
export const getListModelVechileData = () => {
  return listModelVechile();
};

//
// value for Vechile TABLE header
const headCellVehicle = () => [
  { id: 'model', label: 'Model' },
  { id: 'email', label: 'Email', disabledSorting: true },
  { id: 'mobile', label: 'Mobile' },
  { id: 'city', label: 'City' },
  { id: 'motor', label: 'Motor' },
  { id: 'producer', label: 'Producer' },
  { id: 'action', label: 'Action', disabledSorting: true },
];
export const getHeadCellVechileData = () => {
  return headCellVehicle();
};

const headCellProducer = () => [
  { id: 'model', label: 'Model' },
  { id: 'producer', label: 'Producer' },
  { id: 'action', label: 'Action', disabledSorting: true },
];

export const getCellHeaderProducers = () => {
  return headCellProducer();
};

//
// init fake value listVehicle
export const getListVehicleInitData = () => {
  return listVehicleInit();
};

const listVehicleInit = () => [
  {
    id: 'idx001',
    modelAuto: 'm07',
    email: 'sesvete@yahoo',
    mobile: '111111',
    city: 'Sesvete',
    motor: 'diesel',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
  {
    id: 'idx002',
    modelAuto: 'm08',
    email: 'ford-email@yahoo.com',
    mobile: '222222',
    city: 'Vukovar',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx003',
    modelAuto: 'm08',
    email: 'split@yahoo.com',
    mobile: '3333',
    city: 'Split',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx004',
    modelAuto: 'm10',
    email: 'fiat-email@yahoo.com',
    mobile: '44444',
    city: 'Zagreb',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx005',
    modelAuto: 'm01',
    email: 'vinkovci@yahoo.com',
    mobile: '55555522',
    city: 'Vinkovci',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx006',
    modelAuto: 'm01',
    email: 'email22@yahoo.com',
    mobile: '6666666',
    city: 'Buzet',
    motor: 'diesel',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx007',
    modelAuto: 'm09',
    email: 'audi-email@yahoo.com',
    mobile: '7777777',
    city: 'Prag',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx008',
    modelAuto: 'm12',
    email: 'osijek@gmail.com',
    mobile: '8888888',
    city: 'Osijek',
    motor: 'electric',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx009',
    modelAuto: 'm08',
    email: 'ford-email@yahoo.com',
    mobile: '9999999',
    city: 'Kutina',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
  {
    id: 'idx010',
    modelAuto: 'm08',
    email: 'ford-email123@yahoo.com',
    mobile: '100000',
    city: 'Pula',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx011',
    modelAuto: 'm05',
    email: 'volvo-1@yahoo.com',
    mobile: '101000',
    city: 'Pula',
    motor: 'electric',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
  {
    id: 'idx012',
    modelAuto: 'm04',
    email: 'karlovac@yahoo.com',
    mobile: '101100',
    city: 'Karlovac',
    motor: 'electric',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx013',
    modelAuto: 'm13',
    email: 'toyota-email@yahoo.com',
    mobile: '101100',
    city: 'Aljmaš',
    motor: 'electric',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx014',
    modelAuto: 'm01',
    email: 'bmw-email@yahoo.com',
    mobile: '101100',
    city: 'Buzet',
    motor: 'diesel',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
];
