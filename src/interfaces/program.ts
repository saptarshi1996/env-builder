export default interface Program {
  command: string
  description: string
  action: () => void
}
