### Java Surefire plugin configuration and argLine
1. Make sure prefix with ${argLine} in configuration section
2. If preview features are used, during testing, enable preview
3. If some packages are not exported by default in new JDK versions, then using --add-exports to export them if code or libraries are using them.
```
  <configuration>
    <argLine>
      ${argLine}
      --enable-preview
      --add-exports java.base/sun.nio.ch=ALL-UNNAMED
      --add-exports java.base/sun.security.action=ALL-UNNAMED
    </argLine>
  </configureation>
```
