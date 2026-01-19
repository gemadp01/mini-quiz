"use client";

import useSettings from "@/app/(dashboard)/user/settings/_hooks/useSettings";
import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  const {
    formProfileData,
    formProfileSecurity,
    onSubmitProfileData,
    onSubmitProfileSecurity,
    loadingProfileData,
  } = useSettings();

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">User Settings</h1>
      </div>
      <div className="flex w-full flex-col gap-6">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your profile data</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <Form {...formProfileData}>
                  <form
                    onSubmit={formProfileData.handleSubmit(onSubmitProfileData)}
                    className="space-y-4"
                  >
                    <FormInput
                      form={formProfileData}
                      type="text"
                      name="name"
                      label="Name"
                    />
                    <FormInput
                      form={formProfileData}
                      type="email"
                      name="email"
                      label="Email"
                    />
                    <div className="w-full flex justify-end">
                      <Button type="submit">
                        {loadingProfileData ? <Spinner /> : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Change Password by entering your old password and new
                  password.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <Form {...formProfileSecurity}>
                  <form
                    onSubmit={formProfileSecurity.handleSubmit(
                      onSubmitProfileSecurity,
                    )}
                    className="space-y-4"
                  >
                    <FormInput
                      form={formProfileSecurity}
                      type="password"
                      name="oldPassword"
                      label="Old Password"
                      placeholder=""
                    />
                    <FormInput
                      form={formProfileSecurity}
                      type="password"
                      name="newPassword"
                      label="New Password"
                    />
                    <FormInput
                      form={formProfileSecurity}
                      type="password"
                      name="confirmNewPassword"
                      label="Confirm New Password"
                    />
                    <div className="w-full flex justify-end">
                      <Button type="submit">
                        {/* {loading ? <Spinner /> : "Login"} */}
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
