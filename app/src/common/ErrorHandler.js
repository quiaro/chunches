import StackTrace from 'stacktrace-js'

var callback = function(stackframes) {
    var stringifiedStack = stackframes.map(function(sf) {
        return sf.toString();
    }).join('\n');
    // TODO: output to error log
    console.log(stringifiedStack);
};

export default (error) => {
  StackTrace.get().then(callback);

  if (error.graphQLErrors) {
    const errorList = error.graphQLErrors.map(err => {
      return {
        message: err.message,
        data: {
          type: 'graphQLError',
          code: err.code,
          path: err.path
        }
      }
    });

    errorList.forEach(err => {
      // TODO: output to error log
      console.log(err);
    })    
  }
}
