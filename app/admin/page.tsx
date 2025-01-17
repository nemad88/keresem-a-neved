import { addFriend } from "@/actions/friends";
import { deleteAllGivenNames } from "@/actions/given-names";
import { uploadNames } from "@/actions/uploadNames";
import { RoleGate } from "@/app/components/auth/role-gate";
import { Role } from "@prisma/client";

const Admin = () => {
  const buttonStyle = "bg-yellow-100 text-black p-2 rounded-xl";
  return (
    <RoleGate allowedRole={Role.ADMIN}>
      <div>
        <h1>Seed</h1>
        <form
          action={async () => {
            "use server";
            await uploadNames("female");
          }}
        >
          <button className={buttonStyle}>Upload female</button>
        </form>
        <form
          action={async () => {
            "use server";
            uploadNames("male");
          }}
        >
          <button className={buttonStyle}>Upload male</button>
        </form>
        <form
          action={async () => {
            "use server";
            deleteAllGivenNames();
          }}
        >
          <button className={buttonStyle}>Delete all given names</button>
        </form>
        <form
          action={async (formData: FormData) => {
            "use server";

            if (!formData.get("senderId") || !formData.get("receiverId")) {
              return;
            }

            await addFriend(
              formData.get("senderId") as string,
              formData.get("receiverId") as string
            );
          }}
        >
          <input type="text" name="senderId" placeholder="Sender id" />
          <input type="text" name="receiverId" placeholder="Receiver id" />
          <button className={buttonStyle}>Create friends</button>
        </form>
      </div>
    </RoleGate>
  );
};

export default Admin;
