export class ErrorsResponse {
  private HasErrors: boolean;
  private ErrorMessages: string[];

  constructor() {
    this.HasErrors = false;
    this.ErrorMessages = [];
  }

  AddError(message: string) {
    this.HasErrors = true;
    this.ErrorMessages.push(message);
  }

  Clear() {
    this.HasErrors = false;
    this.ErrorMessages = [];
  }
}
