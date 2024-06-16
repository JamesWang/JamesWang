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
