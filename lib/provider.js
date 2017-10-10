'use babel';
import GtnEngine from './gtn-platform-engine';

class Provider{
    constructor(){
      // automcomplete-plus
      this.selector = '.source.js';
      this.disableForSelector = '.source.js .comment';
      this.inclusionPriority = 1;
      this.suggestionPriority = 2;
      this.engine = new GtnEngine();
      this.token = null;
    }

    getSuggestions({editor, bufferPosition, scopeDescriptor, prefix, activatedManually}) {
        this.suggestions = [];
        let lines = editor.buffer.buffer.getLines();
        let fragment = this.pinpointStringFragment(lines , bufferPosition);

        if( this.shouldSuggestionProviders( fragment ) ){
            this.suggestions.push( { text : 'Providers' , description : 'GT Nexus Scripting Provider'} );
        } else if( this.shouldSuggestSubProvider( fragment, lines, bufferPosition ) ){
            this.suggestions = this.engine.compile( fragment );
        }
        console.log( this.suggestions );
        return this.suggestions;
    }

    onDidInsertSuggestion({ editor , loc , suggestion} ){
      console.log(suggestion);
    }

    pinpointStringFragment( lines , bufferPosition ){
        let line = this.buildJSExpression( lines , bufferPosition.row , '' );
        //remove any parameters within js expression
        line = line.replace(/\(([^\)]*)\)/g , '()');
        if( line.indexOf('=') > -1 ){
          line = line.substring( line.indexOf('=') + 1 );
        }
        //eliminate whitespace
        line = line.replace(/ /g , '');
        console.log('line is ' + line );
        return line;
    }

    buildJSExpression( lines , rowNum , jsExpression ){
        let line = lines[ rowNum ].trim() + jsExpression.trim();
        if( line.charAt(0) == '.' && rowNum ){
           return this.buildJSExpression( lines , rowNum - 1 , line );
        } else{
          return line;
        }
    }

    shouldSuggestionProviders( line ){
      return ( line == '' || line.charAt( line.length - 1 ) == "=" || 'Provider'.startsWith(line) );
    }
    shouldSuggestSubProvider( fragment, lines, bufferPosition ){
      return ( fragment.indexOf('Providers.') > -1 &&
              lines[ bufferPosition.row ].length == bufferPosition.column );
    }
}

export default new Provider();
