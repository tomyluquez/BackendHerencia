export class ResponseMessages {
  private HasErrors: boolean;
  private ErrorMessages: string[];
  private HasWarnings: boolean;
  private WarningMessages: string[];
  private HasSuccess: boolean;
  private SuccessMessages: string[];

  constructor() {
    this.HasErrors = false;
    this.ErrorMessages = [];
    this.HasWarnings = false;
    this.WarningMessages = [];
    this.HasSuccess = false;
    this.SuccessMessages = [];
  }

  AddError(message: string) {
    this.HasErrors = true;
    this.ErrorMessages.push(message);
  }

  AddWarning(message: string) {
    this.HasWarnings = true;
    this.WarningMessages.push(message);
  }

  AddSuccess(message: string) {
    this.HasSuccess = true;
    this.SuccessMessages.push(message);
  }

  Clear() {
    this.HasErrors = false;
    this.ErrorMessages = [];
    this.HasWarnings = false;
    this.WarningMessages = [];
    this.HasSuccess = false;
    this.SuccessMessages = [];
  }
}
