1. Scoped Value
![image](https://github.com/user-attachments/assets/ffe7cbc6-ba1e-4d73-b041-e425819cd3f7)
2. Stream Gathers API
![image](https://github.com/user-attachments/assets/cb0f96a8-3f14-418a-8916-b46d4f3ad408)\
[JEP461](https://openjdk.org/jeps/461)
3.Virtual Thread
  - Pinned
    before Java 23, synchronized block/method will pin the virtual thread, so prefer to use ReentrantLock which will not pin the threads
    also avoid use chained calls for threads start and join, i.e. avoid
    ```
    threadLlist.stream().peek(Thread::start).forEach(t -> try { t.join(); } ...}; this will make run one by one
    start those threads first, then outside the loop pipeline to join
    ```
  - ReentrantLock
    Reentrantock is a synchronization mechanism in Java that offers more flexibity than synchronized block/method. it provides sophisticated thread
    interactions and additional features, such as fairness, try-lock, interruptibleity. it avoids the pinning prolem in virtual threads (with synchronized)
    ***ReentrantLock** uses park/unpark mechanisms that are virtual-thread aware. the JVM can detect when a virtual thread parks and unmount it from its carrier
    thread. Future JDK might introduce "unpinning-aware" I/O, potentially migating pinning in some scenarios. for now, it's often wise to favor ***ReentrantLock**
    for more flexible synchronization
4. Core Libraries
 [Java22-Core](https://docs.oracle.com/en/java/javase/22/core/index.html)

   
