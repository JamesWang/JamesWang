### Functor, Applicative and Monad
* Functor abstracts mapping over some value in a computational context
```
  fmap :: Function f => (a -> b) -> f a -> f b
```
* Applicative enables injecting values into a context and applying a function in a context to a value in a context
```
  pure :: Applicative f => a -> f a
  <*> :: Applicative f => f ( a -> b ) -> f a -? f b //apply()
```
* Monad allows sequencing of computation in a context so that next computation depends on the result of the previous one.
```flatMap
  (>>=) :: Monad m => m a -> a -> m b -> m b
```
  
### Using Writer
```
ghci> import Control.Monad.Writer
ghci> fmap (+1) (writer (42, "step 1\n")) :: Writer String Int
WriterT (Identity (43,"step 1\n"))
```
