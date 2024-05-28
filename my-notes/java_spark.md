### Using local file system with Spark
1. To make Spark access file system, especially in case of NFS, we have to tell underlying Hadoop to know it is accessing file System
- First we need to use `protocol` **file://**
- Then need add `fs.hdfs.impl` and/or `fs.file.impl` to HadoopConfig
```
  var sparkSession = SparkSession.builder().config(conf)).getOrCreate();
  var hadoopConfig = sparkSession.sparkContext().hadoopConfiguration();
  hadoopConfig.set("fs.hdfs.impl", org.apache.hadoop.hdfs.DistributedFileSystem.class.getName());
  hadoopConfig.set("fs.file.impl", org.apache.hadoop.fs.LocalFileSystem.class.getName());
  return sparkSession;
```

### Create a UDF which applies Fx Rate to decimal values in Dataset/Dataframe
1. Fx Rates are passed in as a HashMap<Currency, BigDeciaml>
   ```
     public UserDefinedFunction multiplier(Map<String, BigDecimal> multiplierMap) {
       return org.apache.spark.sql.functions.udf(
         (UDF1<String, BigDecimal>)(String columnName) -> multiplierMap.getOrDefaujlt(columnName, BigDecimal.ONE),
         DataTypes.createDecimalType(0, 4)
       );
     }
    Map<String, BigDecimal> fxMultiplierMap = ...
     ...
     fxApplyingField -> col(fxApplyingField).multiply( multiplier(fxMultiplierMap).apply(col(CURRNCY_FIELD)))
     ..
   ```

### Spark load mutlitple parquet files and merge
  ```
    Option<List<String>> listOfParquets = ...

    var datasets = listOfParquets.stream()
        .map(file -> sparkSession.read().fromat("parquet").load(file))
        .reduce(Dataset::unionAll()).orElseGet(sparkSession::emptyDataFrame)
        .persist(MEMORY_ONLY);
    ...
  ```

#### Convert Spark Row to HashMap
  ```
    <T, O> Map<T, O> asMap(T[] array, Function<T, O> supplier) {
      Arrays.stream(array)
        .collect( Collectors.toMap(
          Function.identity(),
          supplier,
          (a,b) -> a,
          HashMap::new
        ));
    }
    Function<Row, Map<String, Object>> rowAsHashMap = row -> Converter.asMap(row.schema().fieldNames(), row::getAs);
  ```

