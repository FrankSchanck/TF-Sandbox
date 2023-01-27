import { Construct } from "constructs";
import { Stack, aws_ec2 as ec2 } from 'aws-cdk-lib';
import * as cdktf from "cdktf";
// import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
// import { Instance } from "@cdktf/provider-aws/lib/instance";

/**
 * CDK for TF
 */
/* class MyStackCDKTF extends cdktf.TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "eu-central-1",
    });

    const ec2Instance = new Instance(this, "compute", {
      ami: "ami-01456a894f71116f2",
      instanceType: "t2.micro",
      tags: {
          Name: "cdktf-instance",
      }
    });

    new cdktf.TerraformOutput(this, "public_ip", {
      value: ec2Instance.publicIp,
    });

  }
} 

const app = new cdktf.App();
new MyStackCDKTF(app, "cdk-for-tf");
app.synth();
*/

/**
 * CDK 
 */
class MyStackCDK extends Stack{
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new ec2.Instance(this, "test", {
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux(),
      vpc: new ec2.Vpc(this, "vpc"),
    });

  }
}

const appCdk = new cdktf.App();
new MyStackCDK(appCdk, "cdk");
appCdk.synth();

