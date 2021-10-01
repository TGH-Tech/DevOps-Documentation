# Server vs Serverless

1. Scalability <br>
        A **Server** does not scale up or down. It has a capacity that cannot be exceeded, and its resources stay available even if they’re not being used (being effectively wasted).
        **Serverless** systems automatically scale server instances up and down to handle load. You do nothing to achieve this behavior.

2. Maintenance <br>
            A **Server** requires maintenance. If you run a server, you might have to monitor it, install software, install patches, tune it, and other operations. You have to figure out how to deploy your code to it.
            **Serverless** system require no maintenance. The cloud provider handles all these details of managing the underlying hardware. You just write and deploy code using tools provided by the cloud vendor.

3. Cost
            A **Server** has some ongoing cost associated with it. Typically costs are paid on an hourly, daily, or monthly basis just to keep the server up and running, even if it’s not being used.
            **Serverless** systems are billed per function invocation. When you deploy code to a serverless backend, you will be charged for resources uses (invocations, memory, bandwidth). If you use nothing, you are charged nothing.
4. Programming paradigm
                A **Server** allows you to deploy services that run on an ongoing basis. You can typically log in and run whatever programs you want, whenever you want, for as long as you want.
                **Serverless** systems are event-driven by nature. You deploy code that runs in response to events that occur in the system. These can be things like database triggers that respond to changes, or HTTP requests that serve an API. Code does not run outside of the context of handling some event, and it is often constrained by some time limits.

Serverless Computing VS Containers
1. Physical machines
            **Serverless** computing actually runs on servers, but it is up to the serverless vendor to provision server space as it is needed by the application; no specific machines are assigned for a given function or application.
            Each **container** lives on one machine at a time and uses the operating system of that machine, though they can be moved easily to a different machine if desired.

2. Scalability
            In a **container-based architecture**, the number of containers deployed is determined by the developer in advance
            In a **Serverless architecture**, the backend inherently and automatically scales to meet demand.

3. Cost
            **Containers** are constantly running, and therefore cloud providers have to charge for the server space even if no one is using the application at the time.
            There are no continued expenses in a **Serverless** architecture because application code does not run unless it is called. Instead, developers are only charged for the server capacity that their application does in fact use.
4. Maintenance
            **Containers** are hosted in the cloud, but cloud providers do not update or maintain them. Developers have to manage and update each container they deploy.
            **Serverless** architecture has no backend to manage. The vendor takes care of all management and software updates for the servers that run the code.
