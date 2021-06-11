{
    // Method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form'); //getting the form

        // e is for the event
        newPostForm.submit(function(e){
            // Prevent default submission
            e.preventDefault();

            // Manually submit it 
            $.ajax({
                type: 'post', // type of request
                url: '/posts/create',  // At which Router
                data: newPostForm.serialize(), //This convert the post form data into JSON
                
                // if successfully posted else error
                success: function(data){
                    console.log(data);
                }, error: function(error){
                    console.log(error.responseText);
                }
            }); 
        });
    }

    // Method to create a post in DOM
    let newPostDOM = function(post){
        return $(``)
    }

    createPost();
}