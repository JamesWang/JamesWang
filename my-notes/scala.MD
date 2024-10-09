### Generic vs. Abstract Type
* Generics are a way of parameterizing classes, make it choose concrete type until later
* Also can parameterize methods
```
trait Adder:
    def sum[T](a:T, b:T): T
```
- It is good for 
  - if you need just type instantiation
  - create a family of types
  - mostly used for input parameter types

* Abstract Type is another way to parameterize classes
```
trait Adder:
    type T
    def sum[T](a: T, b:T): T
```
- It is good for 
  - mix in types using trait
  - better readability
  - hide the type definition from the client code
  - mostly used for output/return value type

### typeclass with Ad hoc polymorphism
- define algorithm (trait, typeclass)
- create instances for different types(implementation, given/implicit)
- import the proper one in the places where they will be used
```
trait Adder[T]:
    def sum(a: T, b: T): T

object Adder:
    def sum[T: Adder](a: T, b: T) = summon[Adder[T]].sum(a, b)

given addInt: Adder[Int] = (a: Int, b: Int) = a + b
```
### self-type and cake design pattern
- used for **dependency injection**
- avoid inheritance in a non-is-a relationship
    - inheritance leaking functionality

### Reactive With Scala
- Manage failures, known as **design for failure**
    - A failing component does not brining down the entire application
- Minimize latency by delegating long-running processes to background threads without blocking the main thread of execution
- Effectful computation
  - An effect is modeled usually in the form of a type constructor that constructs types with these additional capabilities.
  - An effect adds some capabilities to a computation.
  - Abstract within containers that expose funcational interfaces to the world

