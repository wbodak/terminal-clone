export interface LoginDto {
  userName?: string
  password?: string
  corp_id: number
  section_id: number
  year: number
  newPassword?: string
  accountType: AccountType
}

enum AccountType {
  erp,
  terminal
}
