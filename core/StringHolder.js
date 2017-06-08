export default class StringHolder
{
    constructor()
    {
        this.program_command_1 = "echo raida";
        this.program_command_2 = "show coins";
        this.program_command_3 = "import";
        this.program_command_4 = "export";
        this.program_command_5 = "fix fracked";
        this.program_command_6 = "show folders";
        this.program_command_7 = "export for sales";
        this.program_command_8 = "quit";
        this.program_run_1 = "Commands Available:";
        this.program_run_2 = "Command failed. Try again.";

        this.program_start_1 = "║                  CloudCoin Foundation 2 v.4.04.17                ║";
        this.program_start_2 = "║          Used to Authenticate, Store and Payout CloudCoins       ║";
        this.program_start_3 = "║      This Software is provided as is with all faults, defects    ║";
        this.program_start_4 = "║          and errors, and without warranty of any kind.           ║";
        this.program_start_5 = "║                Free from the CloudCoin Consortium.               ║";
        this.program_start_6 = "Checking RAIDA...";
        this.program_echo_1 = "RAIDA Health: "; 
        this.program_echo_2 = " out of 25";
        this.program_echo_3 = "Not enough RAIDA servers can be contacted to import new coins.";
        this.program_echo_4 = "Is your device connected to the Internet?";
        this.program_echo_5 = "Is a router blocking your connection?";
        this.program_echo_6 = "The RAIDA is ready for counterfeit detection.";
        this.raida0 = "Australia";
        this.raida1 = "Macedonia";
        this.raida2 = "Philippines";
        this.raida3 = "Serbia";
        this.raida4 = "Bulgaria";
        this.raida5 = "Russia";
        this.raida6 = "Switzerland";
        this.raida7 = "United Kingdom";
        this.raida8 = "Punjab";
        this.raida9 = "India";
        this.raida10 = "Texas";
        this.raida11 = "USA";
        this.raida12 = "Romania";
        this.raida13 = "Taiwan";
        this.raida14 = "Moscow";
        this.raida15 = "St. Petersburge";
        this.raida16 = "Columbia";
        this.raida17 = "Singapore";
        this.raida18 = "Germany";
        this.raida19 = "Canada";
        this.raida20 = "Venezuela";
        this.raida21 = "Hyperbad";
        this.raida22 = "USA";
        this.raida23 = "Ukraine";
        this.raida24 = "Luxenburg";
        this.program_showcoins_total = "║  Total Coins in Bank:    ";
        this.program_showcoins_perfect = "║ Perfect: ║ ";
        this.program_showcoins_fracked = "║ Fracked: ║ ";
        this.program_showFolders_1 = "Your Root folder is:";
        this.program_showFolders_2 = "Your Import folder is:";
        this.program_showFolders_3 = "Your Imported folder is:";
        this.program_showFolders_4 = "Your Suspect folder is:";
        this.program_showFolders_5 = "Your Trash folder is:";
        this.program_showFolders_6 = "Your Bank folder is:";
        this.program_showFolders_7 = "Your Fracked folder is:";
        this.program_showFolders_8 = "Your Templates folder is:";
        this.program_showFolders_9 = "Your Directory folder is:";
        this.program_showFolders_10 = "Your Counterfeits folder is:";
        this.program_showFolders_11 = "Your Export folder is:";
        this.program_import_1 = "Finishing importing coins from last time...";
        this.program_import_2 = "Now looking in import folder for new coins...";
        this.program_import_3 = "Loading all CloudCoins in your Import folder: ";
        this.program_import_4 = "No coins in import folder.";

        this.program_detect_1 = "Detecting Authentication of Suspect Coins";
        this.program_detect_2 = "Total imported to bank: ";
        this.program_detect_3 = "Total imported to fracked: ";
        this.program_detect_4 = "Total Counterfeit: ";
        this.program_detect_5 = "Total Kept in suspect folder: ";

        this.program_dump_1 = "Export for sales will export stack files one note in them.";
        this.program_dump_2 = "Each file will recieve a random tag.";
        this.program_dump_3 = "This function helps you make CloudCoins for automated sales points.";
        this.program_dump_4 = "Continue to dump? 1.Yes or 2. No?";
        //Note this code is used in export and export for sales
        this.program_dump_5 = "Your Bank Inventory:";
        this.program_dump_6 = "How many 1s do you want to export?";
        this.program_dump_7 = "How many 5s do you want to export?";
        this.program_dump_8 = "How many 25s do you want to export?";
        this.program_dump_9 = "How many 100s do you want to export?";
        this.program_dump_10 = "How many 250s do you want to export?";
        this.program_dump_11 = "Export complete. Check your export folder";

        this.program_export_1 = "Do you want to export your CloudCoin to (1)jpgs or (2) stack (JSON) file?";
        this.program_export_2 = "Tag your jpegs with 'random' to give them a random number.";
        this.program_export_3 = "What tag will you add to the file name?";

        this.program_fix_1 = "Fixing fracked coins can take many minutes.";
        this.program_fix_2 = "If your coins are not completely fixed, fix fracked again.";
        this.program_fix_3 = "Attempting to fix all fracked coins.";
        this.program_fix_4 = "Fix Time: ";
        this.program_fix_5 = "If your coins are not completely fixed, you may fix fracked again.";


        this.cloudcoin_report = "║  Authenticity Report SN #";
        this.cloudcoin_denomination = ", Denomination: ";

        this.detector_3 = "You tried to import a coin that has already been imported.";
        this.detector_4 = "Suspect CloudCoin was moved to Trash folder.";
        this.detector_5 = "Now scanning coin ";
        this.detector_6 = " for counterfeit. SN ";
        this.detector_7 = "Not enough RAIDA were contacted to determine if the coin is authentic.";
        this.detector_8 = "Try again later.";

        this.frackfixer_1 = "RAIDA Fails Echo or Fix. Try again when RAIDA online.";
        this.frackfixer_2 = " unfracked successfully.";
        this.frackfixer_3 = "RAIDA failed to accept tickets on corner ";
        this.frackfixer_4 = "Trusted servers failed to provide tickets for corner ";
        this.frackfixer_5 = "One or more of the trusted triad will not echo and detect.So not trying.";
        this.frackfixer_6 = "You have no fracked coins.";
        this.frackfixer_unfracking = "UnFracking coin ";
        this.frackfixer_8 = "CloudCoin was moved to Bank.";
        this.frackfixer_9 = "CloudCoin was moved to Trash.";
        this.frackfixer_10 = "CloudCoin was moved back to Fraked folder.";
        this.frackfixer_11 = "Attempting to fix RAIDA ";
        this.frackfixer_12 = " Using corner ";
        this.frackfixer_13 = "Time spent fixing RAIDA in milliseconds: ";

        this.importer_1 = " File moved to trash: ";
        this.importer_2 = " File not found: ";
        this.importer_3 = " IO Exception: ";
        this.importer_importstack1 = "The following file does not appear to be valid JSON. It will be moved to the Trash Folder: ";
        this.importer_importstack2 = "Paste the text into http://jsonlint.com/ to check for validity.";

        this.importer_seemsValidJSON_1 = "The stack file did not have a matching number of { }. There were";
        this.importer_seemsValidJSON_2 = "The stack file did not have a matching number of []. There were ";
        this.importer_seemsValidJSON_3 = "The stack file did not have a matching number of double quotations";
        this.importer_seemsValidJSON_4 = "The stack file did not have a the right number of full colons :";

        this.keyboardreader_1 = " IO Exception: ";
        this.keyboardreader_2 = "Please enter one of the following: ";
        this.keyboardreader_3 = "Input is not an integer. ";
        this.keyboardreader_4 = "Please enter an integer between ";
        this.keyboardreader_5 = "Input is not an integer. Please enter an integer between ";
        this.keyboardreader_6 = "Please enter one of the following: ";
        this.keyboardreader_7 = "Fatal error. Exiting program.";
    }

    loadNewlanguage(temp) {

        this.program_command_1 = temp.program_command_1;
        this.program_command_2 = temp.program_command_2;
        this.program_command_3 = temp.program_command_3;
        this.program_command_4 = temp.program_command_4;
        this.program_command_5 = temp.program_command_5;
        this.program_command_6 = temp.program_command_6;
        this.program_command_7 = temp.program_command_7;
        this.program_command_8 = temp.program_command_8;
        this.program_run_1 = temp.program_run_1;
        this.program_run_2 = temp.program_run_2;

        this.program_start_1 = temp.program_start_1;
        this.program_start_2 = temp.program_start_2;
        this.program_start_3 = temp.program_start_3;
        this.program_start_4 = temp.program_start_4;
        this.program_start_5 = temp.program_start_5;
        this.program_start_6 = temp.program_start_6;
        this.program_echo_1 = temp.program_echo_1;
        this.program_echo_2 = temp.program_echo_2;
        this.program_echo_3 = temp.program_echo_3;
        this.program_echo_4 = temp.program_echo_4;
        this.program_echo_5 = temp.program_echo_5;
        this.program_echo_6 = temp.program_echo_6;
        this.raida0 = temp.raida0;
        this.raida1 = temp.raida1;
        this.raida2 = temp.raida2;
        this.raida3 = temp.raida3;
        this.raida4 = temp.raida4;
        this.raida5 = temp.raida5;
        this.raida6 = temp.raida6;
        this.raida7 = temp.raida7;
        this.raida8 = temp.raida8;
        this.raida9 = temp.raida9;
        this.raida10 = temp.raida10;
        this.raida11 = temp.raida11;
        this.raida12 = temp.raida12;
        this.raida13 = temp.raida13;
        this.raida14 = temp.raida14;
        this.raida15 = temp.raida15;
        this.raida16 = temp.raida16;
        this.raida17 = temp.raida17;
        this.raida18 = temp.raida18;
        this.raida19 = temp.raida19;
        this.raida20 = temp.raida20;
        this.raida21 = temp.raida21;
        this.raida22 = temp.raida22;
        this.raida23 = temp.raida23;
        this.raida24 = temp.raida24;
        this.program_showcoins_total = temp.program_showcoins_total;
        this.program_showcoins_perfect = temp.program_showcoins_perfect;
        this.program_showcoins_fracked = temp.program_showcoins_fracked;
        this.program_showFolders_1 = temp.program_showFolders_1;
        this.program_showFolders_2 = temp.program_showFolders_2;
        this.program_showFolders_3 = temp.program_showFolders_3;
        this.program_showFolders_4 = temp.this.program_showFolders_4;
        this.program_showFolders_5 = temp.program_showFolders_5;
        this.program_showFolders_6 = temp.program_showFolders_6;
        this.program_showFolders_7 = temp.program_showFolders_7;
        this.program_showFolders_8 = temp.program_showFolders_8;
        this.program_showFolders_9 = temp.program_showFolders_9;
        this.program_showFolders_10 = temp.program_showFolders_10;
        this.program_showFolders_11 = temp.program_showFolders_11;
        this.program_import_1 = temp.program_import_1;
        this.program_import_2 = temp.program_import_2;
        this.program_import_3 = temp.program_import_3;
        this.program_import_4 = temp.program_import_4;

        this.program_detect_1 = temp.program_detect_1;
        this.program_detect_2 = temp.program_detect_2;
        this.program_detect_3 = temp.program_detect_3;
        this.program_detect_4 = temp.program_detect_4;
        this.program_detect_5 = temp.program_detect_5;

        this.program_dump_1 = temp.program_dump_1;
        this.program_dump_2 = temp.program_dump_2;
        this.program_dump_3 = temp.program_dump_3;
        this.program_dump_4 = temp.program_dump_4;
        //Note this code is used in export and export for sales
        this.program_dump_5 = temp.program_dump_5;
        this.program_dump_6 = temp.program_dump_6;
        this.program_dump_7 = temp.program_dump_7;
        this.program_dump_8 = temp.program_dump_8;
        this.program_dump_9 = temp.program_dump_9;
        this.program_dump_10 = temp.program_dump_10;
        this.program_dump_11 = temp.program_dump_11;

        this.program_export_1 = temp.program_export_1;
        this.program_export_2 = temp.program_export_2;
        this.program_export_3 = temp.program_export_3;

        this.program_fix_1 = temp.program_fix_1;
        this.program_fix_2 = temp.program_fix_2;
        this.program_fix_3 = temp.program_fix_3;
        this.program_fix_4 = temp.program_fix_4;
        this.program_fix_5 = temp.program_fix_5;


        this.cloudcoin_report = temp.cloudcoin_report;
        this.cloudcoin_denomination = temp.cloudcoin_denomination;

        this.detector_3 = temp.detector_3;
        this.detector_4 = temp.detector_4;
        this.detector_5 = temp.detector_5;
        this.detector_6 = temp.detector_6;
        this.detector_7 = temp.detector_7;
        this.detector_8 = temp.detector_8;

        this.frackfixer_1 = temp.frackfixer_1;
        this.frackfixer_2 = temp.frackfixer_2;
        this.frackfixer_3 = temp.frackfixer_3;
        this.frackfixer_4 = temp.frackfixer_4;
        this.frackfixer_5 = temp.frackfixer_5;
        this.frackfixer_6 = temp.frackfixer_6;
        this.frackfixer_unfracking = temp.frackfixer_unfracking;
        this.frackfixer_8 = temp.frackfixer_8;
        this.frackfixer_9 = temp.frackfixer_9;
        this.frackfixer_10 = temp.frackfixer_10;
        this.frackfixer_11 = temp.frackfixer_11;
        this.frackfixer_12 = temp.frackfixer_12;
        this.frackfixer_13 = temp.frackfixer_13;

        this.importer_1 = temp.importer_1;
        this.importer_2 = temp.importer_2;
        this.importer_3 = temp.importer_3;
        this.importer_importstack1 = temp.importer_importstack1;
        this.importer_importstack2 = temp.importer_importstack2;

        this.importer_seemsValidJSON_1 = temp.importer_seemsValidJSON_1;
        this.importer_seemsValidJSON_2 = temp.importer_seemsValidJSON_2;
        this.importer_seemsValidJSON_3 = temp.importer_seemsValidJSON_3;
        this.importer_seemsValidJSON_4 = temp.importer_seemsValidJSON_4;

        this.keyboardreader_1 = temp.keyboardreader_1;
        this.keyboardreader_2 = temp.keyboardreader_2;
        this.keyboardreader_3 = temp.keyboardreader_3;
        this.keyboardreader_4 = temp.keyboardreader_4;
        this.keyboardreader_5 = temp.keyboardreader_5;
        this.keyboardreader_6 = temp.keyboardreader_6;
        this.keyboardreader_7 = temp.keyboardreader_7;

    }//end load new language
    
}
//export default class{}