// Mock Userpilot so the script has something to talk to
window.userpilot = {
    track: function(eventName, properties) {
        console.log("%c SUCCESS: Userpilot received event: " + eventName, "color: green; font-weight: bold;");
        console.table(properties);                                                               
    }
};                                                                   
           