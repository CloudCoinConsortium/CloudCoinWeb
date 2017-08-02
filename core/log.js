class Log
{
    constructor()
    {
        this.logContents = "0 start of file.";
        this.lines = 0;
        
    }

    updateLog(msg)
    {
        this.lines++;
        this.logContents += "\r\n " + this.lines + " "; //newline
        this.logContents += msg;
    }

    updateLine(msg)
    {
        this.logContents += msg;
    }

    downloadLog()
    {
        let dl = new Blob([this.logContents]);
        saveAs(dl, "ccWebBankLog.log");
    }
}