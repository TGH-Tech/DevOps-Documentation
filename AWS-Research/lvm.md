# Online Upgrade the Size of the Drive (LVM)

## --> Step 1: Partion
 $ fdisk /dev/deviceName
 --> under the fdisk
     --> :n (for New Partion) and then follow the Steps
     --> :w (at last write the partion table)
     
## --> Step 2: Create PV from this Device
 $ pvcreate /dev/deviceName(with specfic partition name)
 $ pvdisplay (You Can Confirm Also)
 
## --> Step 3: Create Volume Group Just Like (Storage Lake)

$ vgcreate nameOfYourVg  DeviceName(which you u have converted to PV)
$ vgdisplay nameOfYourVg(to confirm it)

## --> Step 4: take the Space from the VG this is known as the LV

$ lvcreate --size SIZE(like 1G) --name NameOfYourLV NameOfVG(through you wants to take the space)
$ vgdisplay nameOfYourVg (that Now the Updated Spce for the VG)

$ lvdisplay NameofYourVG/NameOfYourLv (So that See the Detail of the LV)


## --> Step 5: Now Formate(You Can Choose as per your kernal and requirment) the LV to make it Usable

$ mkfs.ext4 /dev/NameOfYourVG/NameOfYourLV

Make dir to Mount with this LV so that we can use it.

$ mkdir DBDriveProject1
$ mount /dev/NameOfYourVG/NameOfYourLV ./DBDriveProject1

### But Next Don't When you need increase the Space of same Derive in the Online Mode don't use this way to format the INODE TABLE

-->use
    $ resize2fs /dev/NameOfYourVg/NameOfYourLv

Completed Now you can easily use it :)