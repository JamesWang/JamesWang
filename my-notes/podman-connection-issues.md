### Issues faced
	- Environment:
		- Docker ported to Podman
		- Podman using Bridge (slirp4netns) with rootless
		- RedHat 7.x -> RedHat 8.x
	- Issues:
		- connection(pygrid) to GCP stuck or timeout
		- connection (oracle) -> Oracle DB: ORA-15427 Loss host contact
		- connection to Kafka, timeout
		
  - Tried
    - Increase open file (ulimit -a) to 1M    - Not resolve
    - Increase PROC limit                     - Not resolve

    - Change netwwork mode to "host"  -   seems working 
 
  - Also notice:
    - vmstat -s  
      - shows >90% memory are consuemd by incorrectly configured "aide" process which stuck at NFS checking
                   and not exit, but every day starts a new 
			- it shows most time get 0 Free Swap

