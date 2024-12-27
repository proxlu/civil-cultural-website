import Event from '@ioc:Adonis/Core/Event'
import DataEvent from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'


if(Application.inDev) 
    Event.on("db:query", DataEvent.prettyPrint)



