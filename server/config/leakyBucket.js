class LeakyBucket{

    constructor(capacity, leakRatePerSec){
        this.capacity = capacity;
        this.leakRatePerSec = leakRatePerSec;
        this.queue  = [];
        this.lastLeak = Date.now();

        //start leaking

        setInterval(()=>this.leak(), 1000/this.leakRatePerSec) // why here dividing

    }

    leak(){
        if(this.queue.length>0){
            //removing older one
            const req = this.queue.shift();
            req.next();
        }
    }
    
    //adding request in bucket
    tryAdd(req, res, next){
        if(this.queue.length < this.capacity){
            this.queue.push({req, res, next});
            return true;
        }else{
            res.status(429).json({error:"Too Many Requests"});
            return false;
        }

    }

}

// const bucket = new LeakyBucket(10, 1);

function rateLimitter(options = {}){

    const {capacity = 10, leakRate = 1} = options;

    //it delay the respone till the capacity, after that it return 429 in leaky bucket
    const bucket = new LeakyBucket(capacity, leakRate);

    return function(req, res, next){
        bucket.tryAdd(req, res, next);
    }

}


export default rateLimitter;