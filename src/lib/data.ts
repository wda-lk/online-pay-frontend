export interface User {
  nicNumber: string,
  name: string,
  address: string,
  district: string,
  email?: string,
  mobileNumber: string,
  password: string,
  isActive: boolean
}

interface District {
  label: string,
  value: string
}

interface TaxType {
  label: string,
  value: string
}

interface Nature {
  label: string,
  value: string
}

interface SubNature {
  label: string,
  value: string,
}

export const users: User[] = [
  {
    nicNumber: "912000000V",
    name: "Name",
    address: "Address",
    district: "District",
    email: "adminkurunegala@cat20.lk",
    mobileNumber: "077264678",
    password: "admin",
    isActive: true
  },
  {
    nicNumber: "951200042V",
    name: "Name",
    address: "Address",
    district: "District",
    email: "malaka@cat20.lk",
    mobileNumber: "0770000000",
    password: "admin",
    isActive: false
  },
  {
    nicNumber: "770653312V",
    name: "Name",
    address: "Address",
    district: "District",
    email: "prasa.medawachchiya@gmail.com",
    mobileNumber: "0771111111",
    password: "admin",
    isActive: false
  },
  {
    nicNumber: "927571811V",
    name: "Name",
    address: "Address",
    district: "District",
    email: "rambewaps2015@gmail.com",
    mobileNumber: "0772222222",
    password: "admin",
    isActive: false
  }
]

export const districts: District[] = [
  { label: "Ampara", value: "ampara" },
  { label: "Anuradhapura", value: "anuradhapura" },
  { label: "Badulla", value: "badulla" },
  { label: "Batticaloa", value: "batticaloa" },
  { label: "Colombo", value: "colombo" },
  { label: "Galle", value: "galle" },
  { label: "Gampaha", value: "gampaha" },
  { label: "Hambantota", value: "hambantota" },
  { label: "Jaffna", value: "jaffna" },
  { label: "Kalutara", value: "kalutara" },
  { label: "Kandy", value: "kandy" },
  { label: "Kegalle", value: "kegalle" },
  { label: "Kilinochchi", value: "kilinochchi" },
  { label: "Kurunegala", value: "kurunegala" },
  { label: "Mannar", value: "mannar" },
  { label: "Matale", value: "matale" },
  { label: "Matara", value: "matara" },
  { label: "Moneragala", value: "moneragala" },
  { label: "Mullaitivu", value: "mullaitivu" },
  { label: "Nuwara Eliya", value: "nuwara-eliya" },
  { label: "Polonnaruwa", value: "polonnaruwa" },
  { label: "Puttalam", value: "puttalam" },
  { label: "Ratnapura", value: "ratnapura" },
  { label: "Trincomalee", value: "trincomalee" },
  { label: "Vavuniya", value: "vavuniya" }
]

export const taxTypes: TaxType[] = [
  { label: "Business Tax", value: "business-tax" },
  { label: "Industrial Tax", value: "industrial-tax" },
  { label: "Trade License Tax", value: "trade-tax" }
]

export const natures: Nature[] = [
  {
    label: "Animal Husbandry",
    value: "animal-husbandry"
  },
  {
    label: "Fish Farming",
    value: "fish-farming"
  }
]

export const subNatures: SubNature[] = [
  { label: "Raising of silk worms and production of silk", value: "000" },
  { label: "Raising of bees and production of honey", value: "001" },
  { label: "Raising of poultry and production of eggs", value: "002" },
  { label: "Rearing of sheep and production of wool", value: "003" },
  { label: "Rearing of animals and production of animal products", value: "004" },
  { label: "Fishing on commercial basis in inland waters", value: "02002" },
  { label: "Fishing on commercial basis in ocean and coastal areas", value: "02003" },
  { label: "Gathering of marine materials such as natural pearls, sponges, coral", value: "02004" },
  { label: "Services related to marine and fresh water fisheries, fish hatcheries and fish farms", value: "02005" }
]
