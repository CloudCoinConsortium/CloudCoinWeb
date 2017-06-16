 function Response() 
 { 
    this.fullRequest;
	this.fullResponse;
	this.success;
	this.outcome;
	this.milliseconds; 
      
 
 
     function Response(success, outcome, milliseconds, fullRequest, fullResponse) 
     { 
         this.success = success; 
         this.outcome = outcome; 
         this.milliseconds = milliseconds; 
         this.fullRequest = fullRequest; 
         this.fullResponse = fullResponse; 
 } 
     function Response() 
    { 
         this.success = false; 
         this.outcome = "not used"; 
         this.milliseconds = 0; 
         this.fullRequest = "No request"; 
         this.fullResponse = "No response"; 
 } 
 } 
</script>