'use babel';

const developer_site_url = "https://developer.gtnexus.com/platform/scripts/built-in-functions/";

export const Providers = {
    'getQueryProvider()' : {
        'text' : 'PlatformQuery',
        'description' : 'Send queries over the GT Nexus API',
        'url' : developer_site_url + 'querying-for-objects',
        fns : {
          'createQuery()' : {
            description : 'Create a query against the platform API',
            params : [
              { text : 'object' , type : 'String'},
              { text : 'version' , type : 'Integer'}
            ],
            return : 'PlatformQuery'
          }
        }
    },
    'PlatformQuery' : {
        ignoreOnProviders : true,
        fns : {
          'addParameter()' : {
            description : 'This method is used to add additional parameters to the request.',
            params : [
              { text : 'key', type : 'String'},
              { text : 'value' , type : 'String'}
            ],
            return : 'PlatformQuery'
          },
          'setOQL()' : {
            description : 'This method is used to add the OQL query to the request.',
            params : [
              { text : 'oql' , type : 'OQL String'}
            ],
            return : 'PlatformQuery'
          },
          'execute()' : {
            description : 'This method executes the query.',
            params : []
          }
        }
    },
    'getSessionProvider()' : {
      'text' : 'SessionProvider',
      'description' : 'Provider to get details about the current session',
      'url' : developer_site_url + "retrieving-user-details",
      fns : {
        'getCurrentUserId()' : {
          description : 'Returns the User ID of the person logged into the system.',
          params : [],
          return : 'String'
        },
        'getCurrentOrgId()' : {
          description : 'Returns the Organization ID that the person logged into the system belongs to.',
          params : [],
          return : 'String'
        },
        'getCurrentOrgName()' : {
          description : 'Returns the Organization Name that the person logged into the system belongs to',
          params : [],
          return : 'String'
        },
        'getCurrentOrgRoles' : {
          description : 'Returns all of the roles that are played in this transaction by the organization that the person logged into the system belongs to. For example, if the transaction is anchored to an order, the roles this org plays in the order will be returned',
          params : [],
          return : 'Array<String>'
        }
      }
    },
    'getPersistenceProvider()' : {
      'text' : 'PersistenceProvider',
      'description' : 'Provider that persists data to the GT Nexus platform',
      'url' : developer_site_url + "fetching-an-object",
      fns : {
        'save()' : {
          description : 'Saves the object that is passed into the function',
          params : [
            { text : 'Object' , type : 'GTNexus Scriptable Object'}
          ],
          return : 'void'
        },
        'createFetchRequest()' : {
          description : "Create a new GT Nexus Object",
          params : [
            { text : 'ObjectType' , type : 'String - type of GT Nexus Object'},
            { text : 'version - OPTIONAL' , type : 'int'},
            { text : 'id - OPTIONAL' , type : 'string' }
          ],
          return : 'PlatformFetchRequest'
        },
        'processAction()' : {
          description : 'This method processes the action specified for the object. There are several rules as to when you can transition an object via script using this method. Transitioning is only applicable to objects other than the object that fired the event. Transitions are not applicable from pre-condition-fn or validation-fn timings. The object being transitioned can be saved prior to calling the processAction() function but cannot be saved again within this script or set of scripts that run at this timing',
          params : [
            { text : 'object' , type : 'Scriptable Object'},
            { text : 'workflow action' , type : 'String'}
          ],
          return : 'void'
        },
        'isMarkedForSave()' : {
          description : 'Returns whether or not save() has been called in this script.',
          params : [ { text : 'object' , type : 'Scriptable Object'} ],
          return : 'boolean'
        },
        'getStateAsLoaded()' : {
          description : 'Returns the state of the object prior to this transition.',
          params : [],
          return : 'String'
        },
        'publishOutbound()' : {
          description : 'Fire notication',
          params : [ { text : 'targetObject' , type : 'JS{Notification Object}'} , { text : 'notificationTopic - OPTIONAL' , type : 'String'} ],
          return : 'void'
        },
        'suppressNotification()' : {
          description: 'Suppress a notification from sending',
          params : [ { text : 'targetObject' , type : 'JS{Notification Object}'} , { text : 'cNotificationId' , type : 'String'} ],
          return : 'boolean'
        },
        'getTargetAsLoaded()' : {
          description: 'Get object persistd representation',
          params : [],
          return : 'GTN Platform Object'
        }
      }
    },
    'getObjectFactoryProvider()' : {
      'text' : 'ObjectProvider' ,
      'description' : 'Create new object on GT Nexus Platform',
      'url' : developer_site_url + "creating-an-object",
      fns : {
        'newObject()' : {
          description : 'Returns a new instance of an object of the specified type in the specified version.',
          params : [
            { text : 'objectType' , type : 'String'},
            { text : 'version' , type : 'int'}
          ],
          return : 'Scriptable Object'
        }
      }
    },
    'PlatformFetchRequest' : {
      'text' : 'PlatformFetchRequest',
      'description' : 'Perform GET request against GT Nexus API',
      'url' : developer_site_url + "fetching-an-object",
      'ignoreOnProviders' : true ,
      fns : {
        'addParameter()' : {
          description : 'This method is used to add additional parameters to your request.',
          params : [
            { text : 'key' , type : 'String'},
            { text : 'value' , type : 'String'}
          ],
          return : 'PlatformFetchRequest'
        },
        'apiVersion()' : {
          description : 'This method is used to specify the API Version that you would like the results back in',
          params : [ { text : 'apiVersion' , type : 'int' } ],
          return : 'PlatformFetchRequest'
        },
        'resource()' : {
          description : 'this method is for retrieving resource',
          params : [ { text : 'resource' , type : 'String'} ,
                     { text : 'resourceId - OPTIONAL' , type : 'String'} ],
          return : 'PlatformFetchRequest'
        },
        'execute()' : {
          description : 'Execute a GET Request',
          params : [],
          return : 'Scriptable Object'
        }
      }
    },
    'getViewAccessProvider()' : {
      description : 'Provider that allows view rights to be granted to a specific org',
      text : 'ViewAccessProvider',
      'url' : developer_site_url + "granting-visibility",
      fns : {
        'grantRuntimeAccess()' : {
          description : 'This grants the organization (of the specified ID) with visibility of the object that fired the event.',
          params : [
            { text : 'orgId' , type : 'String'}
          ],
          return : 'void'
        }
      }
    },
    'getDictionaryProvider()' : {
      description : 'Get an objects data dictionary',
      text : 'DictionaryProvider' ,
      'url' : developer_site_url + "getting-object-design",
      fns : {
        'getDataDictionary()' : {
          description : 'Get the data dictionary for an object type.',
          params : [
            { text : 'object' , type : 'String'},
            { text : 'version - OPTIONAL' , type : 'int'}
          ],
          return : 'Scriptable Object'
        }
      }
    },
    'getMessageProvider()' : {
      description : 'Display information or error messages on the platforms user interface',
      text : 'MessageProvider',
      return : 'getMessageProvider()',
      'url' : developer_site_url + "error-messages-to-ui",
      fns : {
        'info()'  : {
          description : 'Throw an information message to the UI',
          params : [],
          return : 'MessageProvider'
        },
        'error()' : {
          description : 'Throw an error message to the UI. Note - for native objects, this only fires during the OnValidate event',
          params : [],
          return : 'MessageProvider'
        },
        'findMessageById()' : {
          description : 'Find a message by its msgId',
          params : [ { text : 'id' , type : 'String'} ],
          return : 'JS{MessageObject}'
        },
        'findMessagesByField()' : {
          description : 'Find messages by field path',
          params : [ { text : 'fieldPath' , type : 'String'} ],
          return : 'JS{MessageObject}'
        } ,
        'findMessagesByKey()' : {
          description : 'Find message by key',
          params : [ { text : 'messageKey' , type : 'String'} ] ,
          return : 'JS{MessageObject}'
        },
        'findMessagesByRuleId()' : {
          description : 'Find messages by rule id' ,
          params : [ { text : 'ruleId' , type : 'String'} ],
          return : 'JS{MessageObject}'
        },
        'findMessagesByRuleIdAndField()' : {
          description : 'Find message by rule id and field path',
          params : [ { text : 'ruleId' , type : 'String'} , { text : 'fieldPath' , type : 'String'} ],
          return : 'JS{MessageObject}'
        },
        'findMessages()' : {
          description : 'Find messages in the message provider' ,
          params : [],
          return : 'JS{MessageObject}'
        },
        'suppressRuleId()' : {
          description : 'Get suppressed message by rule id',
          params : [ { text : 'ruleId' , type : 'String'}],
          return : 'JS{MessageObject}'
        },
        'suppressMessageId()' : {
          description : 'Get suppressed message by message id',
          params : [{ type : 'String' , text : 'msgId'}],
          return : 'boolean'
        },
        'suppressMessage()' : {
          description : 'Suppress message',
          params : [{ type : 'Scriptable Message' , text : 'object'}],
          return : 'boolean'
        }

      }
    },
    'MessageProvider' : {
      ignoreOnProviders : true,
      'url' : developer_site_url + "error-messages-to-ui",
      fns : {
        'msgKey()' : {
          description : 'The required msgKey is used to retrieve the message template that has been configured in the localization tab',
          params : [ { text : 'msgKey' , type : 'String' }],
          return : 'MessageProvider'
        },
        'fieldPath()' : {
          description : 'The optional fieldpath is the path of the field this message refers to',
          params : [ { text : 'fieldPath' , type : 'String' }],
          return : 'MessageProvider'
        },
        'ruleId()' : {
          description : 'The optional ruleId is a user specified ID to identify this message by its rule',
          params : [ { text : 'ruleId' , type : 'String' }],
          return : 'MessageProvider'
        },
        'suppressible()' : {
          description : 'Allows a script to suppress this message',
          params : [ { text : 'suppressible' , type : 'boolean' } ],
          return : 'MessageProvider'
        },
        'arg()' : {
          description : 'Supply key-value replacement for message text template',
          params : [ { text : 'key' , type : 'String' } , { text : 'value' , type : 'Object'} ],
          return : 'MessageProvider'
        },
        'args()' : {
          description : 'Supply multiple key-value replacement for message text template. Pass in an object with keys and values',
          params : [ { text : 'args' , type : 'Javascript Object' } ],
          return : 'MessageProvider'
        },
        'msgId()' : {
          description : 'Returns the unique msgId of the message that has been built',
          params : [],
          return : 'String'
        } ,
        'build()' : {
          description : 'Build the message - it will return the built messages unique msgId',
          params : [],
          return : 'String'
        }
      }
    },
    'getNotificationProvider()' : {
      description : 'Set template for the notification provider',
      text : 'NotificationProvider',
      'url' : developer_site_url + "setting-data-for-notifications",
      fns : {
        'setData()' : {
          description : 'Set data on template using key',
          params : [ { text : 'key' , type : 'String'} , { text : 'value' , type : 'String'}],
          return : 'void'
        },
        'setObject()' : {
          description : 'Set subject of notification',
          params : [ { text : 'subjectContent' , type : 'String'} ],
          return : 'void'
        },
        'cancelNotification()' : {
          description : 'Cancel a notification' ,
          params : [],
          return : 'void'
        },
        'attach' : {
          description : 'Attach scripable Attachment Object',
          params : [ { type : 'Attachment Javascript' , text : 'object'} ],
          return : 'AttachmentBuilder'
        },
        'attach()' : {
          description : 'Attach GT Nexus document using type and UID',
          params : [ { type : 'String' , text : 'type'} , { type : 'String' , text : 'uid'} ],
          return : 'AttachmentBuilder'
        }
      }
    },
    'AttachmentBuilder' : {
      ignoreOnProviders : true,
      fns : {
        'asPDF()' : {
          description : 'Sets the attachment type as MimeType.PDF',
          params : [],
          return : 'AttachmentBuilder'
        },
        'object' : {
          description: 'Pass in attachment object root',
          params : [{ text : 'rootToAttach' , type : 'GT Nexus Object'} ],
          return : 'AttachmentBuilder'
        },
        'object()' : {
          description : 'Pass in UID and object to attach the object to this builder',
          params : [ { text : 'type' , type : 'String' } , { text : 'uid' , type : 'String' } ],
          return : 'AttachmentBuilder'
        },
        'templateName()' : {
          description : 'Attach template name',
          params : [ { text : 'templateName' , type : 'String'} ],
          return : 'AttachmentBuilder'
        },
        'fileName()' : {
          description : 'Attach file name to attachment builder',
          params : [ { text : 'fileName' , type : 'String'} ],
          return : 'AttachmentBuilder'
        },
        'addToZip()' : {
          description : 'Attach to zip',
          params : [ { text : 'zipName' , type : 'String'} ],
          return : 'AttachmentBuilder'
        },
        'dataFn()' : {
          description : 'Add data function to builder',
          params : [ { text : 'dataFn' , type : 'String'} ],
          return : 'AttachmentBuilder'
        },
        'build()' : {
          description : 'Build notification',
          params : [],
          return : 'void'
        }
      }
    },
    'getDataApiProvider()' : {
      description : 'Send raw API get requests to GT Nexus platform',
      text : 'DAPIProvider',
      'url' : developer_site_url + "api-get-request",
      fns : {
        'get()' : {
          description : 'Send GET request - pass in URL endpoint. For example, "/rest/310/<Object>/etc"',
          params : [ { text : 'urlPath' , type : 'String'} ],
          return : 'getDataApiProvider()'
        },
        'execute()' : {
          description : 'Execute request',
          params : [],
          return : 'void'
        },
        'withHeader()' : {
          description : 'Add HTTP header',
          params : [ { text : 'name' , type : 'String'} , { text : 'value' , type : 'String'}],
          return : 'getDataApiProvider()'
        },
        'withParameter()' : {
          description : 'Add URL parameter',
          params : [ { text : 'key' , type : 'String'} , { text : 'value' , type : 'String'}],
          return : 'getDataApiProvider()'
        }
      }
    }
};
