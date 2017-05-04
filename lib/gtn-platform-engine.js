'use babel';
import * as gtn from './gtn-platform-providers';

export default class GtnEngine{
  constructor(){
      this.allGtnProviders = GtnEngine.extractAllProviders();
  }
  /*
    Called by getSuggestions of the provider
    @param {string} prefix - line of Code
    @return {array<{ text , type , description }> } an array of suggestions
  */
  compile( fragment ){
      var tokens = fragment.split('.');
      if( tokens[0] != 'Providers'){
        console.error('Gtn Platform Engine token fragment does not start with Providers - it should');
      }
      /*
          Tokens.length == 2
            Use the fragment and return possible platform providers
          Tokens.length == 3
            From the subprovider and fragment, return possible functions
          else
            Determine what the last function returned - then give possible providers
            from return type
      */
      if( tokens.length == 2 ){
        return this.consumeTwoTokens( tokens[1] );
      } else if( tokens.length == 3 ){
        return this.consumeThreeTokens( tokens[1] , tokens[2] );
      } else {
        return this.consumeXTokens( tokens );
      }
  }

  consumeTwoTokens( fragment ){
     let tempProviders = [],
      i = 0,
      len = this.allGtnProviders.length,
      temp = null;

     for(i; i < len; i++){
        temp = this.allGtnProviders[i];
        if( temp.displayText.startsWith( fragment ) ){
          //set text
          tempProviders.push({
              text : temp.text,
              description : temp.desc,
              displayText : temp.text,
              replacementPrefix : fragment,
              type : temp.type,
              descriptionMoreURL : temp.url
          });
        }
     }
     return tempProviders;
  }

  consumeThreeTokens( subprovider , fragment ){
    let tempProviders = [],
      displayText : null;
    let gtn_provider = gtn.Providers[ subprovider ];
    if( gtn_provider ){
        let fns = gtn_provider.fns;
        for( var key in fns ){
          if( fns.hasOwnProperty(key) ){
            if( key.startsWith( fragment ) ){
                tempProviders.push({
                    //text : key,
                    snippet : this.formSnippet( key , fns[key].params ),
                    description : fns[key].description,
                    type : 'function',
                    replacementPrefix : fragment,
                    leftLabel : fns[key].return,
                    displayText : this.formDisplayText( key , fns[key].params ),
                    descriptionMoreURL : gtn_provider.url
                })
            }
          }
        }
        return tempProviders;
      }
      else{
        return [];
      }
  }

  formSnippet( fn , params ){
    let snippetStr = '(';
    let tabCounter = 1;
    params.forEach( (p) => {
      snippetStr += '${' + tabCounter + ':' + p.text + '},';
      tabCounter ++;
    });
    if(snippetStr.charAt( snippetStr.length -1 ) == ','){
      snippetStr = snippetStr.slice(0,-1);
    }
    snippetStr += ')$' + tabCounter;
    fn = fn.replace('()' , snippetStr );
    return fn;
  }

  /*
    Tokens
  */
  consumeXTokens( tokens ){

    let fragment = tokens[ tokens.length - 1 ],
      provider = tokens[1],
      len = tokens.length,
      i = 2,
      subProvider = tokens[2].replace(/\((.*)\)/g , '()' ),
      fn = tokens[ tokens.length - 2 ].replace(/\((.*)\)/g , '()' )
    let possibleProvider =  gtn.Providers[ provider ].fns[subProvider] &&
                            gtn.Providers[ provider ].fns[subProvider].return;
    let returnedProvider = gtn.Providers[ possibleProvider ] &&
                           gtn.Providers[ possibleProvider ].fns[ fn ];

    if( ! returnedProvider || returnedProvider.return == possibleProvider ){
      return this.consumeThreeTokens( possibleProvider , fragment );
    }
    return [];
  }

  formDisplayText( fn , params ){
      let str = '', i = 0 , len = params.length;
      for(i;i < len; i++){
        str += params[i].text + ": " + params[i].type + ",";
      }
      str = str.slice(0,-1);
      provider = fn.replace('()' , '(' + str + ')');
      return provider;
  }

  static extractAllProviders(){
     let providers = [];
     for( var key in gtn.Providers ){
       if( gtn.Providers.hasOwnProperty(key) ){
          if( ! gtn.Providers[key].ignoreOnProviders ){
            providers.push({
              text : key,
              displayText : key,
              type : gtn.Providers[key].text,
              desc : gtn.Providers[key].description,
              url : gtn.Providers[key].url
            });
          }
       }
     }
     return providers;
  }
}
