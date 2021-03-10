// Init values and reset for form
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

// 
// Init valuues for form producers
export const initProducerValue =  [
  { model: 'yyy', producer: 'xxx' },
]

// 
// list of vehicle producers
export const getProducerOptions = () => [
  { id: 'p1', producer: 'BMW' },
  { id: 'p2', producer: 'FORD' },
  { id: 'p3', producer: 'AUDI' },
  { id: 'p4', producer: 'FIAT' },
  { id: 'p5', producer: 'VOLVO' },
  { id: 'p6', producer: 'TOYOTA' },
]


// 
// list of vehicle models
export const getModelOptions = () => [
  { id: 'm1', model: 'BMW mod1' , producerId:'p1'},
  { id: 'm2', model: 'FORD mod1', producerId:'p2' },
  { id: 'm3', model: 'AUDI mod1', producerId:'p3' },
  { id: 'm4', model: 'FIAT mod1', producerId:'p4'},
  { id: 'm5', model: 'VOLVO mod1' ,producerId:'p5' },
  { id: 'm6', model: 'TOYOTA mod1', producerId:'p6'},
  { id: 'm7', model: 'BMW 2mod' , producerId:'p1'},
  { id: 'm8', model: 'FORD 2mod', producerId:'p2' },
  { id: 'm9', model: 'AUDI 2mod', producerId:'p3' },
  { id: 'm10', model: 'FIAT 2mod', producerId:'p4'},
  { id: 'm11', model: 'VOLVO 2mod' ,producerId:'p5' },
  { id: 'm12', model: 'TOYOTA 2mod', producerId:'p6'},
]

// 
// list of vehicle producers
export const listProducers =  [
  { id: 'p1', producer: 'BMW' },
  { id: 'p2', producer: 'FORD' },
  { id: 'p3', producer: 'AUDI' },
  { id: 'p4', producer: 'FIAT' },
  { id: 'p5', producer: 'VOLVO' },
  { id: 'p6', producer: 'TOYOTA' },
]

// 
// list of vehicle models
export const listModelVechile = [
  { id: 'm1', model: 'BMW mod1' , producerId:'p1'},
  { id: 'm2', model: 'FORD mod1', producerId:'p2' },
  { id: 'm3', model: 'AUDI mod1', producerId:'p3' },
  { id: 'm4', model: 'FIAT mod1', producerId:'p4'},
  { id: 'm5', model: 'VOLVO mod1' ,producerId:'p5' },
  { id: 'm6', model: 'TOYOTA mod1', producerId:'p6'},
  { id: 'm7', model: 'BMW 2mod' , producerId:'p1'},
  { id: 'm8', model: 'FORD 2mod', producerId:'p2' },
  { id: 'm9', model: 'AUDI 2mod', producerId:'p3' },
  { id: 'm10', model: 'FIAT 2mod', producerId:'p4'},
  { id: 'm11', model: 'VOLVO 2mod' ,producerId:'p5' },
  { id: 'm12', model: 'TOYOTA 2mod', producerId:'p6'},
]

// 
// value for TABLE header
export const headCellVechile = [
  {id:'model', label:'Model'},
  {id:'email', label:'Email', disabledSorting:true},
  {id:'mobile', label:'Mobile'},
  {id:'city', label:'City'},
  {id:'motor', label:'Motor'},
  {id:'producer', label:'Producer'},
  {id:'action', label:'Action',disabledSorting:true}
]

// 
// value for TABLE header
export const headCellProducer = [
  {id:'model', label:'Model'},
  {id:'producer', label:'Producer'},
]

// 
// init fake value u listVehicle
export const listVehicleInit = [
  {
    id: 'idx001',
    modelAuto: 'm7',
    model:'BMW 2mod',
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
    model:'FORD 2mod',
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
    model: 'AUDI mod1',
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
    model:'FIAT mod1',
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
    model: 'FIAT mod1',
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
    model: 'FIAT mod1',
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
    model: 'TOYOTA mod1',
    email: 'email77@yahoo.com',
    mobile: 777777,
    city: 'Pula',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
  {
    id: 'idx008',
    modelAuto: 'm9',
    model: 'AUDI 2mod',
    email: 'email33@yahoo.com',
    mobile: 333333,
    city: 'Osjek',
    motor: 'diesel',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx009',
    modelAuto: 'm9',
    model: 'AUDI 2mod',
    email: 'email33@yahoo.com',
    mobile: 333333,
    city: 'Osjek',
    motor: 'diesel',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
  {
    id: 'idx010',
    modelAuto: 'm4',
    model: 'FIAT mod1',
    email: 'email66@yahoo.com',
    mobile: 666,
    city: 'Gospić',
    motor: 'electric',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
  {
    id: 'idx011',
    modelAuto: 'm6',
    model: 'TOYOTA mod1',
    email: 'email77@yahoo.com',
    mobile: 111777,
    city: 'Varaždin',
    motor: 'benzin',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
  {
    id: 'idx012',
    modelAuto: 'm9',
    model: 'AUDI 2mod',
    email: 'email33@yahoo.com',
    mobile: 333333,
    city: 'Virovitica',
    motor: 'diesel',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
];


