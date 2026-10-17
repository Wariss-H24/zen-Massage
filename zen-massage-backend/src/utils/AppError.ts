export class AppError extends Error {
  public readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'AppError'
    this.status = status
    // Nécessaire pour instanceof avec les classes qui étendent Error en TypeScript
    Object.setPrototypeOf(this, AppError.prototype)
  }
}
