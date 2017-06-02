class RaidaResponse {
    constructor(success = false, outcome = "not used", milliseconds = 0, fullRequest = "No request"
    , fullResponse = "No response") {
        this.success = success;
        this.outcome = outcome;
        this.milliseconds = milliseconds;
        this.fullRequest = fullRequest;
        this.fullResponse = fullResponse;
    }

    
}