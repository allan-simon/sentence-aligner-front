# sentence-aligner-front
Reactjs frontend for sentence aligner

## How to use it

you need vagrant and docker installed

then you can run 

```bash
vagrant up
vagrant ssh
```

once you're inside the VM you can do

```
cd /vagrant
yarn run dev
```

It will run the application on the port `8080`

## Add some content

Waiting for a full form to be present in the frontend itself
you can add some sentences using this `curl` command:

```bash
curl http://172.17.0.5/sentences \
    -XPOST \
    -H "Content-Type: application/json" \
    --data '{"text": "Je mange une pomme.", "iso639_3": "fra" }
```
