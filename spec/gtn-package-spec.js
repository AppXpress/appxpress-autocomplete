'use babel';

import Engine from '../lib/gtn-platform-engine';

describe('GTN AutoComplete Testing Suite', function() {
    const testEngine = new Engine();

    beforeEach( function(){
        this.addMatchers({
            toSuggest : function( expectedResponse ){
                let suggestions = this.actual;

                if( ! Array.isArray(suggestions) ){
                  return false;
                }
                let i = 0,
                  len = suggestions.length,
                  pass = false;
                for(i; i < len; i++){
                   let suggestion = suggestions[i].snippet;
                   //ignore parameters
                   suggestion = suggestion.substring(0 , suggestion.indexOf('(') );
                   if( suggestion === expectedResponse )
                    pass = true;
                }
                return pass;
            }
        });
    });

    it('offers All Providers' , () => {
        const lineStart = "Providers.";
        const allProviderLength = testEngine.allGtnProviders.length;
        expect( testEngine.compile( lineStart ).length ).toBe( allProviderLength );
    });
    it("offers createQuery function", () => {
      const lineStart = "Providers.getQueryProvider()."
      expect( testEngine.compile( lineStart ) ).toSuggest("createQuery");
    });
    it("offers add paramater function", () => {
      const lineStart = "Providers.getQueryProvider().createQuery('ObjectDetail' , 310).";
      expect( testEngine.compile( lineStart ) ).toSuggest("addParameter");
    })
    it('offers message provider', () => {
      const lineStart = "Providers.getMessageProvider().info().msgKey(msgKey).ruleId(ruleId).";
      expect( testEngine.compile( lineStart ) ).toSuggest("arg");
    });

});
