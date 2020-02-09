

# In case we are building the html stuff dynamically with Javascript and then want to add an Event Listener like "MouseEnter", then we have to use the parent element.

# For e.g.

# $('.tweet-container').on('mouseenter','.tweet',function(e){
# });

# .tweet class is used to build the element on which the mouse enter event is required.
# .tweet class is in the .tweet-container parent element.
# So while registering mouseenter, we need to define in the above way. 
