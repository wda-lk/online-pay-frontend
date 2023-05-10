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

